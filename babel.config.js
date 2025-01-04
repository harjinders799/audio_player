module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Existing plugin
    [
      'module:react-native-dotenv',  // Add this plugin for dotenv
      {
        envName: 'APP_ENV',  // The environment variable name to use in your project
        moduleName: '@env',  // This will allow you to import env variables like `import { YOUR_ENV_VARIABLE } from '@env'`
        path: '.env',  // Path to your .env file
        safe: false,  // If set to true, it will ensure that all environment variables are defined in the .env file
        allowUndefined: true,  // Allows undefined values if not set in the .env file
        verbose: false,  // Enable this for verbose logs
      }
    ]
  ],
};
