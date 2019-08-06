Admin panel module for managing quizzes. 

Installation

```
cd $PROJECT_ROOT
mkdir submodules
cd submodules
git submodule add ssh://git@gitea.websm.io:2222/Buldakov/admin-quiz-vue.git
cd admin-quiz-vue
yarn
```

```
export NODE_ENV=development
```
or
```
export NODE_ENV=production
yarn run webpack
```

don't forget
```
git submodule init
```
after cloning
```
git submodule update
```
to update submodule

add
```html
<div id='orders'>
<script src='/admin/js/quiz.bundle.js'></script>
```
to template

