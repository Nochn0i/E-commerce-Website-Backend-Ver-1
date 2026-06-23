import chalk from "chalk";

export class system {
  static log(value) {
    console.log(this.get(), `${chalk.blueBright(value)}`);
  }
  static get() {
    return `${chalk.gray.bold("system")}\t:`;
  }
}

export class mongodb {
  static connected(value, host) {
    console.log(this.get(), `${chalk.gray(value)} ${chalk.yellowBright(host)}`);
  }
  static configure(value) {
    console.log(this.get(), `${chalk.grey(value)} `);
  }
  static error(value, err) {
    console.log(this.get(), chalk.red(value), err);
  }
  static get() {
    return `${chalk.gray.bold("mongodb")}\t:`;
  }
}

export class database {
  static success(value) {
    console.log(this.get(), chalk.green(value));
  }
  static error(value, err) {
    console.log(this.get(), chalk.red(value), err);
  }
  static get() {
    return `[ ${chalk.green.bold("database")} ]`;
  }
}

export class server {
  static loading(value) {
    console.log(this.get(), chalk.yellow(value));
  }
  static success(value) {
    console.log(this.get(), chalk.green(value));
  }
  static error(value, err) {
    console.error(this.get(), chalk.redBright(value), err);
  }
  static get() {
    return `[ ${chalk.yellow.bold("server")} ]`;
  }
}

export class appp {
  static get() {
    return `[ ${chalk.blueBright.bold("app")} ]`;
  }
  static loading(value) {
    console.log(this.get(), chalk.yellow(value));
  }

  static default(value) {
    console.log(this.get(), chalk.blue(value));
  }
  static error(value, err) {
    console.log(this.get(), chalk.red(value), err);
  }

  static router(value) {
    console.log(this.get(), chalk.yellow(value));
  }

  static port(value, port) {
    console.log(this.get(), chalk.yellow(value) + chalk.greenBright(port));
  }
}

export class web {
  static get() {
    return `${chalk.yellow.bold("web")}\t:`;
  }

  static default(...args) {
    console.log(this.get(), chalk.gray(args[0]), ...args.slice(1));
  }

  static error(...args) {
    console.log(this.get(), chalk.red(args[0]), ...args.slice(1));
  }
}
