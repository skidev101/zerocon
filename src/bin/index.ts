#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";

async function main() {
	const program = new Command();

program.option("--init [tools...]", "Initilize tools");
program.parse(process.argv);
const options = program.opts();

let tools = options.init;
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
	
	tools = response.tools
}
}

main();
