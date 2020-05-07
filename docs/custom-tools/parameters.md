# Parameters

In order to gain flexibility, a custom tool can define parameters. Those parameters will be editable at runtime within the web interface.

Parameters must be instances of the `PluginParameter` class defined as class attributes.

Here is an example of a plugin with parameters:
```python
# my_custom_plugin.py
import numpy as np
from scipy.io import wavfile
from dataset_explorer.io import FileType
from dataset_explorer.plugins import AudioPlugin, PluginParameter


class AddNoisePlugin(AudioPlugin):
    
    mean = PluginParameter("Mean", 0.0)
    std = PluginParameter("Standard Deviation", 1.0)

    def __init__(self):
        super(AddNoisePlugin, self).__init__("Add Noise", FileType.AUDIO)

    def process(self, data, outFilename):
        """
        Parameter values are updated with the values specified by the user within the web interface
        The 'sr' parameter is defined in the AudioPlugin class, its value is the sample rate at which the audio has been loaded
        """
        noise = np.random.normal(self.mean.value, self.std.value, data.shape)
        wavfile.write(outFilename, self.sr.value, data + noise)
```
