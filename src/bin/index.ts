#!/usr/bin/env node
import {Command} from "commander";
import prompts from "prompts";
import fs from "fs-extra";
import {execa} from "execa"
import chalk from "chalk"

const program = new Command();

function detectPackageManager() {
	if (fs.existsSync("pnpm-lock.yaml")) {
		return "pnpm";
	}
	if (fs.existsSync("yarn.lock")) {
		return "yarn";
	}
	if (fs.existsSync("bun.lockb")) {
		return "bun";
	}
	
	return "npm"
}

const installCommands = {
	npm: "npm install",
	pnpm: "pnpm add",
	yarn: "yarn add",
	bun: "bun add"
}

async function main() {
	
	program.name("zerocon").version("1.0.0").addOption(new Command.Option("--init <tools...>", "Initialize tools"));

program.parse(process.argv);
	
	let tools = program.opts().init;

	if (typeof tools === 'string') tools = [tools]
	console.log("tools to initialize:", options)
	if (!tools || tools.length === 0) {
		const response = await prompts({
			type: "multiselect",
			name: "tools",
			message: "Select tools to configure",
			choices: [
				{
					title: "Prisma", value: "prisma"
				},
							{
					title: "Clerk", value: "clerk"
				},
							{
					title: "Auth.js", value: "authjs"
				},
			]
		});
		
		tools = response.tools || [];
		console.log("configuring tools:",tools);
		if (tools.length == 0) {
			console.log(chalk.yellow("No tools selected. Exiting..."));
			return;
		}
	}
	
	const detectedManager = detectPackageManager();
	try {
		await execa(installCommands[detectedManager] + ' ' + tools.join(' '), { shell:
		true})
		console.log(chalk.green(`Installed ${tools.join(',')} using ${detectedManager}`))
	} catch (error) {
		console.error("error installing dependencies:", error)
		process.exit(1)
	}
	
}

main();
