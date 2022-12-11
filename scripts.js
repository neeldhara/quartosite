var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// Collapsibles

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("collactive");
    var content = document.getElementsByClassName("collcontent")[0];
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = "900px";
    } 
  });
}

// Modals


document.addEventListener('click', function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
      if (target.hasAttribute('data-target')) {
          var m_ID = target.getAttribute('data-target');
          document.getElementById(m_ID).classList.add('open');
          e.preventDefault();
      }
  }

  // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
  if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
      var modal = document.querySelector('[class="modal open"]');
      modal.classList.remove('open');
      e.preventDefault();
  }
}, false);



// This is for the rolling quotes in the footer.

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}
window.onload= function () {
 setInterval(function(){ 
     plusSlides(1);
 }, 4200);
 }



userbase.init({ appId: '4a182d68-3fbd-463f-92d9-279ec10a657e' })
.then((session) => session.user ? showTodos(session.user.username) : showAuth())
.catch(() => showAuth())
.finally(() => document.getElementById('loading-view').style.display = 'none')

function handleLogin(e) {
  e.preventDefault()

  const username = document.getElementById('login-username').value
  const password = document.getElementById('login-password').value

  userbase.signIn({ username, password, rememberMe: 'local' })
    .then((user) => showTodos(user.username))
    .catch((e) => document.getElementById('login-error').innerHTML = e)
}

function handleSignUp(e) {
  e.preventDefault()

  const username = document.getElementById('signup-username').value
  const password = document.getElementById('signup-password').value

  userbase.signUp({ username, password, rememberMe: 'local' })
    .then((user) => showTodos(user.username))
    .catch((e) => document.getElementById('signup-error').innerHTML = e)
}

function handleLogout() {
  userbase.signOut()
    .then(() => showAuth())
    .catch((e) => document.getElementById('logout-error').innerText = e)
}


function showTodos(username) {
  document.getElementById('auth-view').style.display = 'none'
  document.getElementById('todo-view').style.display = 'block'

  // reset the todos view
  document.getElementById('username').innerHTML = username
  document.getElementById('todos').innerText = ''
  document.getElementById('db-loading').style.display = 'block'
  document.getElementById('db-error').innerText = ''

  userbase.openDatabase({ databaseName: 'todos', changeHandler })
    .catch((e) => document.getElementById('db-error').innerText = e)
}

function showAuth() {
  document.getElementById('todo-view').style.display = 'none'
  document.getElementById('auth-view').style.display = 'block'
  document.getElementById('login-username').value = ''
  document.getElementById('login-password').value = ''
  document.getElementById('login-error').innerText = ''
  document.getElementById('signup-username').value = ''
  document.getElementById('signup-password').value = ''
  document.getElementById('signup-error').innerText = ''
}

function changeHandler(items) {
  document.getElementById('db-loading').style.display = 'none'

  const todosList = document.getElementById('todos')

  if (items.length === 0) {
    todosList.innerText = 'Empty'
  } else {
    // clear the list
    todosList.innerHTML = ''

    // render all the to-do items
    for (let i = 0; i < items.length; i++) {

        // build the todo checkbox
        const todoBox = document.createElement('input')
        todoBox.type = 'checkbox'
        todoBox.id = items[i].itemId
        todoBox.checked = items[i].item.complete ? true : false
        todoBox.onclick = (e) => {
          e.preventDefault()
          userbase.updateItem({ databaseName: 'todos', itemId: items[i].itemId, item: {
            'todo': items[i].item.todo,
            'complete': !items[i].item.complete
          }})
          .catch((e) => document.getElementById('add-todo-error').innerHTML = e)
        }

      // build the todo label
      const todoLabel = document.createElement('label')
      todoLabel.innerHTML = items[i].item.todo
      todoLabel.style.textDecoration = items[i].item.complete ? 'line-through' : 'none'

      // append the todo item to the list
      const todoItem = document.createElement('div')
      todoItem.appendChild(todoBox)
      todoItem.appendChild(todoLabel)
      todosList.appendChild(todoItem)

      
    }
  }
}

function addTodoHandler(e) {
  e.preventDefault()

  const todo = document.getElementById('add-todo').value

  userbase.insertItem({ databaseName: 'todos', item: { 'todo': todo }})
    .then(() => document.getElementById('add-todo').value = '')
    .catch((e) => document.getElementById('add-todo-error').innerHTML = e)
}


document.getElementById('login-form').addEventListener('submit', handleLogin)
document.getElementById('signup-form').addEventListener('submit', handleSignUp)
document.getElementById('add-todo-form').addEventListener('submit', addTodoHandler)
document.getElementById('logout-button').addEventListener('click', handleLogout)


document.getElementById('todo-view').style.display = 'none'
document.getElementById('auth-view').style.display = 'none'
