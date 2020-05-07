# Guidelines

Any custom tool must comply to the following guidelines:

- The tool must be defined as a Python class
- The tool class must inherits from the `BasePlugin` class (or any of its direct child)
- The constructor must take no arguments
- The class must implement the `process` function
- The `process` function must write a file with the provided path `outFilename`


## Simple tool example

The simplest tool looks like this:
```python
# my_custom_plugin.py
import cv2
from dataset_explorer.io.filetypes import FileType
from dataset_explorer.plugins.base import BasePlugin


class MyCustomPlugin(BasePlugin):
    """
    MyCustomPlugin inherits from the BasePlugin class
    """

    def __init__(self):
        """
        The child class must provide a name as well as the input/output types of the plugin
        It's required that its constructor takes no argument
        """
        super(MyCustomPlugin, self).__init__("MyCustomPlugin", FileType.IMAGE, FileType.IMAGE)

    def process(self, inFilename, outFilename):
        """
        This method is called automatically, the inFilename argument is the path to the file to process
        The outFilename is the path to the result file that must be created
        For example, this function is converting the input image to black and white
        """
        image = cv2.imread(inFilename)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        cv2.imwrite(outFilename, image)
```


## ImagePlugin and AudioPlugin

When dealing with images or audio files, one may want to avoid the reading step by using `ImagePlugin` or `AudioPlugin` instead of the `BasePlugin` class.
The input file type is then automatically registered as `Image` or `Audio` and the first argument becomes the already loaded data as a `numpy array`.

Here is the above tool refactored to inherit from the `ImagePlugin` class.
```python
# my_custom_plugin.py
import cv2
from dataset_explorer.io.filetypes import FileType
from dataset_explorer.plugins.base import ImagePlugin


class MyCustomPlugin(ImagePlugin):
    """
    MyCustomPlugin inherits from the ImagePlugin class
    """

    def __init__(self):
        """
        The child class must provide a name as well as the output type of the plugin
        The input type is already defined as an image as this class inherits from the ImagePlugin class 
        It's required that its constructor takes no argument
        """
        super(MyCustomPlugin, self).__init__("MyCustomPlugin", FileType.IMAGE)

    def process(self, data, outFilename):
        """
        This method is called automatically, the data argument is the image as a numpy array
        The outFilename is the path to the result file that must be created
        For example, this function is converting the input image to black and white
        """
        data = cv2.cvtColor(data, cv2.COLOR_BGR2GRAY)
        cv2.imwrite(outFilename, data)
```

Note: The `AudioPlugin` has a `Sample Rate` [parameter](./parameters.md) that specifies the sample rate at which the audio must/has been loaded.


## Loadable tools

Most deep learning based algorithm require to load a trained model, this can be accomplished by defining a `load` function. It will automatically be called once before the first call to the `process` function is issued.
It is important that such operations are defined in the `load` function instead of the class constructor to avoid memory issues.

```python
# my_custom_ai_plugin.py
import cv2
from dataset_explorer.io.filetypes import FileType
from dataset_explorer.plugins.base import BasePlugin
from my_deep_learning_model import DeepLearningModel


class MyCustomDLPlugin(BasePlugin):

    def __init__(self):
        super(MyCustomDLPlugin, self).__init__("MyCustomDLPlugin", FileType.IMAGE, FileType.IMAGE)
        self.model = None

    def load(self):
        """
        This method is called automatically once before the first process call is issued
        """
        self.model = DeepLearningModel()

    def process(self, inFilename, outFilename):
        image = cv2.imread(inFilename)
        prediction = self.model.predict(image)
        cv2.imwrite(outFilename, prediction)
```
