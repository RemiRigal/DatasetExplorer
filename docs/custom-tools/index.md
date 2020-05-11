# Custom tools


## Writing custom tools

Dataset Explorer allows you to write custom Python tools so that you can instantly test your own processing pipeline on your data.
To do so you simply need to create a class that inherits the `BasePlugin` class and complies with the [tools guidelines](./guidelines.md).

## Registering your tools  

All python files that define tools must be placed either at `~/.DatasetExplorer/plugins`, or at any directory listed in the environment variable `DATASET_EXPLORER_PLUGINS` (separated by `:`).
