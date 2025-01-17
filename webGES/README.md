# WebGES

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



Run `ng version`

? Would you like to share pseudonymous usage data about this project with the Angular Team
at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more  
details and how to change this setting, see https://angular.io/analytics. Yes

Thank you for sharing pseudonymous usage data. Should you change your mind, the following 
command will disable this feature entirely:

ng analytics disable

Global setting: enabled
Local setting: enabled
Effective status: enabled

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 17.3.9
Node: 20.11.1
Package Manager: npm 10.8.0
OS: win32 x64

Angular: 17.3.12
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, platform-server
... router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1703.9
@angular-devkit/build-angular   17.3.9
@angular-devkit/core            17.3.9
@angular-devkit/schematics      17.3.9
@angular/cli                    17.3.9
@angular/ssr                    17.3.9
@schematics/angular             17.3.9
rxjs                            7.8.1
typescript                      5.3.3
zone.js                         0.14.10

Run `npm -v` = 18.8.0
Run `yarn -v` = 1.22.19 


# Atualizar aplicativo angular v117.0 > v18.0
Run ng update @angular/core@18 @angular/cli@18
Run ng update @angular/cli @angular/core
# instala a versao mais recente do typescrip
Run npm install -g typescript@latest
Run tsc -v 


# exemplos
https://www.itsolutionstuff.com/post/angular-17-crud-application-tutorial-exampleexample.html
https://stackblitz.com/run?file=src%2Fapp%2Ftable-products-demo.html
https://medium.com/@haseenakhader.uk/angular-reactive-form-using-primeng-and-its-validation-8baf6b9e7ed4
https://therichpost.com/angular-16-node-js-express-mysql-example-crud-app/
https://www.tektutorialshub.com/angular/setvalue-patchvalue-in-angular/#google_vignette


# PRIMENG 
npm install primeng
# ------------------
added 1 package, and audited 928 packages in 19s
119 packages are looking for funding
  run `npm fund` for details
2 moderate severity vulnerabilities
To address all issues (including breaking changes), run:
  npm audit fix --force
Run `npm audit` for details.

npm install primeicons
# ------------------
added 1 package, and audited 929 packages in 8s
119 packages are looking for funding
  run `npm fund` for details
2 moderate severity vulnerabilities
To address all issues (including breaking changes), run:
  npm audit fix --force
Run `npm audit` for details.

# PRIMENG THEMES
npm install primeng @primeng/themes
# ------------------
up to date, audited 934 packages in 26s
119 packages are looking for funding
  run `npm fund` for details
11 vulnerabilities (3 low, 4 moderate, 4 high)
To address all issues, run:
  npm audit fix
Run `npm audit` for details.

# instalando a biblioteca moment para conversões de datas 
npm install moment
https://momentjs.com/
# ------------------
added 2 packages, and audited 931 packages in 34s
119 packages are looking for funding
  run `npm fund` for details
3 vulnerabilities (2 moderate, 1 high)
To address all issues, run:
  npm audit fix
Run `npm audit` for details.


# Analisador de pacotes Webpack - Visualize o tamanho dos arquivos de saída do webpack com um mapa de árvore interativo com zoom.
run npm install --save-dev webpack-bundle-analyzer
https://stackoverflow.com/questions/55803291/angular-main-js-file-large-size
https://stackoverflow.com/questions/61177589/what-should-i-adjusting-budget-size-to-in-angular-json

# estrutura
ng generate component postags/index
ng generate component postags/perfil
ng generate component postags/config
ng generate component postags/login

# interface 
ng generate interface postags/tags
ng generate interface postags/usuarios

# Servicos 
ng generate service postags
ng generate service usuarios
ng generate service guards/usuario-nao-autenticado
ng generate service guards/usuario-autenticado

ng generate interceptor interceptors/token
ng generate service interceptors/storageservice

# modulo geral / compoentes PRIMENG
ng generate module globalprimeng

# geração do pacote para implantação.
ng build --configuration production 

# desabilita o cache do navegador no seridor
ng cache disable


# https://balta.io/blog/login-logout-protecao-de-rotas-envio-de-tokens-com-angular
