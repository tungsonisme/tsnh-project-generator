#!/usr/bin/env node
import * as path from "path"
import * as inquirer from "inquirer"

import { createDirectoryContents, createProject } from "./helpers"
import { CURR_DIR, QUESTIONS } from "./constants"
import { CliOptions } from "./types"

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers["template"]
  const projectName = answers["name"]
  const templatePath = path.join(__dirname, "templates", projectChoice)
  const targetPath = path.join(CURR_DIR, projectName)

  const options: CliOptions = {
    projectName,
    templateName: projectChoice,
    templatePath,
    targetPath,
  }

  if (!createProject(targetPath)) {
    return
  }

  createDirectoryContents(templatePath, projectName)
})
