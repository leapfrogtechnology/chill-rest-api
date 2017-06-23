# Chill REST API

REST API for the [chill](https://github.com/leapfrogtechnology/chill) monitoring service.

## Setup

Install dependencies
```bash
# Using npm
$ npm install

# Or using yarn
$ yarn
```
Create a config `chill.yml` file using the sample file.
```bash
$ cp chill.yml.dist chill.yml
```

Run migrations
```
$ yarn migrate
```

Then start the server by providing the config file path. If this is not provided, it will expect the file to be in the current directory.
```
$ CHILL_CONFIG=/path/to/chill.yml yarn start
```

## Contributing

Read our [contributing guide](https://github.com/leapfrogtechnology/chill/blob/master/CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## License

Chill is licensed under the [MIT License](LICENSE.md).
