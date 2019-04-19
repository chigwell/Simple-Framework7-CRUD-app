var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  {
    path: '/add/',
    url: './pages/add.html',
    name: 'add',
  },
  {
    path: '/edit/:index/',
    url: './pages/edit.html',
    name: 'edit',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
