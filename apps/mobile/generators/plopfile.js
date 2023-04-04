module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.tsx.hbs',
        abortOnFail: true,
      },
    ],
  });
  plop.setGenerator('screen', {
    description: 'Create a new screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your screen name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/screens/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.tsx.hbs',
        abortOnFail: true,
      },
    ],
  });
};
