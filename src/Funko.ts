import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definir __dirname manualmente para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

enum FunkoType {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold"
}

enum FunkoGenre {
  Animation = "Animación",
  MoviesTV = "Películas y TV",
  VideoGames = "Videojuegos",
  Sports = "Deportes",
  Music = "Música",
  Anime = "Ánime"
}

interface Funko {
  id: number;
  name: string;
  description: string;
  type: FunkoType;
  genre: FunkoGenre;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;
}

class FunkoCollection {
  private userDir: string;

  constructor(private user: string) {
    this.userDir = path.join(__dirname, 'collections', user);
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }

  addFunko(funko: Funko): void {
    const filePath = path.join(this.userDir, `${funko.id}.json`);
    if (fs.existsSync(filePath)) {
      console.log(chalk.red('Funko already exists in the collection!'));
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
    console.log(chalk.green('New Funko added to collection!'));
  }

  updateFunko(funko: Funko): void {
    const filePath = path.join(this.userDir, `${funko.id}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red('Funko not found in the collection!'));
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
    console.log(chalk.green('Funko updated successfully!'));
  }

  removeFunko(id: number): void {
    const filePath = path.join(this.userDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red('Funko not found in the collection!'));
      return;
    }
    fs.unlinkSync(filePath);
    console.log(chalk.green('Funko removed from collection!'));
  }

  listFunkos(): void {
    const files = fs.readdirSync(this.userDir);
    if (files.length === 0) {
      console.log(chalk.yellow('No Funkos found in the collection.'));
      return;
    }
    files.forEach(file => {
      const funko: Funko = JSON.parse(fs.readFileSync(path.join(this.userDir, file), 'utf-8'));
      let color;
      if (funko.marketValue > 50) color = chalk.green;
      else if (funko.marketValue > 20) color = chalk.blue;
      else if (funko.marketValue > 10) color = chalk.yellow;
      else color = chalk.red;
      console.log(color(`ID: ${funko.id}\nName: ${funko.name}\nDescryption: ${funko.description}\nType: ${funko.type}\nGender: ${funko.genre}\nFranchise: ${funko.franchise}\nNumber ${funko.number}\nExclusive: ${funko.exclusive}\nSpecial Features: ${funko.specialFeatures}\nPrice: ${funko.marketValue}\n`));
    });
  }

  showFunko(id: number): void {
    const filePath = path.join(this.userDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red('Funko not found in the collection!'));
      return;
    }
  }
}

const argv = yargs(hideBin(process.argv))
  .command('add', 'Adds a Funko to the collection', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', demandOption: true },
    type: { type: 'string', choices: Object.values(FunkoType), demandOption: true },
    genre: { type: 'string', choices: Object.values(FunkoGenre), demandOption: true },
    franchise: { type: 'string', demandOption: true },
    number: { type: 'number', demandOption: true },
    exclusive: { type: 'boolean', demandOption: true },
    specialFeatures: { type: 'string', demandOption: true },
    marketValue: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.addFunko({
      id: args.id,
      name: args.name,
      description: args.description,
      type: args.type as FunkoType,
      genre: args.genre as FunkoGenre,
      franchise: args.franchise,
      number: args.number,
      exclusive: args.exclusive,
      specialFeatures: args.specialFeatures,
      marketValue: args.marketValue,
    });
  })
  .command('update', 'Updates an existing Funko in the collection', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', demandOption: true },
    type: { type: 'string', choices: Object.values(FunkoType), demandOption: true },
    genre: { type: 'string', choices: Object.values(FunkoGenre), demandOption: true },
    franchise: { type: 'string', demandOption: true },
    number: { type: 'number', demandOption: true },
    exclusive: { type: 'boolean', demandOption: true },
    specialFeatures: { type: 'string', demandOption: true },
    marketValue: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.updateFunko({
      id: args.id,
      name: args.name,
      description: args.description,
      type: args.type as FunkoType,
      genre: args.genre as FunkoGenre,
      franchise: args.franchise,
      number: args.number,
      exclusive: args.exclusive,
      specialFeatures: args.specialFeatures,
      marketValue: args.marketValue,
    });
  })
  .command('remove', 'Removes a Funko from the collection', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.removeFunko(args.id);
  })
  .command('list', 'Lists all Funkos in the collection', {
    user: { type: 'string', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.listFunkos();
  })
  .command('show', 'Shows details of a specific Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.showFunko(args.id);
  })
  .help()
  .argv;
