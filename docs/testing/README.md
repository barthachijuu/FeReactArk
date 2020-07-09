# Testing

- [Unit Testing](unit-testing.md)
- [Component Testing](component-testing.md)
- [Remote Testing](remote-testing.md)

Testing your application is a vital part of serious development. There are a few
things you should test. If you've never done this before start with [unit testing](unit-testing.md).
Move on to [component testing](component-testing.md) when you feel like you
understand that!

## Usage with this boilerplate

Test your application with this boilerplate is really easy. Every Component created have
a `component.test.js` file, into the `test` folder. It's very important to respect the
name convenction.
To start the test with your application do the following:

1. Create a component ang go to the `test` folder.

2. Write your unit and component tests in those files.

3. Run `yarn test` in your terminal and see all the tests pass! (hopefully)

There are a few more commands related to testing, checkout the [commands documentation](../general/commands.md#testing)
for the full list!
