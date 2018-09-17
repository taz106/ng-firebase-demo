// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCDXWMQq87Xvf9u2hBs4-N-zQ9TxHJRBkI',
    authDomain: 'ng-firebase-demo1.firebaseapp.com',
    databaseURL: 'https://ng-firebase-demo1.firebaseio.com',
    projectId: 'ng-firebase-demo1',
    storageBucket: 'ng-firebase-demo1.appspot.com',
    messagingSenderId: '32138512339'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
