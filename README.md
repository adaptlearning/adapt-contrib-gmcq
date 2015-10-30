# adapt-contrib-gmcq  

**Graphical Multiple Choice Question (GMCQ)** is a *question component* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework). 

<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/gmcq01.gif" alt="graphical multiple choice question in action" >  

It presents possible answers in the form of graphics or images. **GMCQ** is a variation on [**MCQ**](https://github.com/adaptlearning/mcq/wiki). It can be configured with a single correct answer or multiple correct answers. Upon submission, feedback is provided via the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor), if installed. Feedback can be provided for correct, incorrect and partially correct answers. The number of attempts allowed may be configured.

[Visit the **GMCQ** wiki](https://github.com/adaptlearning/adapt-contrib-gmcq/wiki) for more information about its functionality and for explanations of key properties. 



##Installation

As one of Adapt's *[core components](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#components),* **GMCQ** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **GMCQ** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-contrib-gmcq`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-gmcq": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **GMCQ** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

The attributes listed below are used in *components.json* to configure **GMCQ**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-gmcq/blob/master/example.json). Visit the [**GMCQ** wiki](gmcq/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki). 

<div float align=right><a href="#top">Back to Top</a></div>

### Attributes

In addition to the attributes specifically listed below, [*question components*](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#question-components) can implement the following sets of attributes:   
+ [**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. They have no default values. Like the attributes below, their values are assigned in *components.json*. 
+ [**core buttons**](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons): Default values are found in *course.json*, but may be overridden by **GMCQ's** model in *components.json*.

**_component** (string): This value must be: `gmcq`.

**_classes** (string): CSS class name to be applied to **GMCQ**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.  

**_attempts** (integer): This specifies the number of times a learner is allowed to submit an answer. The default is `1`.    

**_shouldDisplayAttempts** (boolean): Determines whether or not the text set in **remainingAttemptText** and **remainingAttemptsText** will be displayed. These two attributes are part of the [core buttons](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons) attribute group. The default is `false`.  

**_isRandom** (boolean): Setting this value to `true` will cause the **_items** to appear in a random order each time the component is loaded. The default is `false`.   

**_questionWeight** (number): A number which reflects the significance of the question in relation to the other questions in the course. This number is used in calculations of the final score reported to the LMS.

**_selectable** (number): Defines the number of **_items**, or answers, that can be selected. If the value of **_selectable** is `1`, **_items** will be presented with HTML radio buttons. If the value is greater than `1`, they will be presented with HTML checkboxes. This number must match the number of **_items** whose **_shouldBeSelected** is set to `true`. The default is `1`.

**_recordInteraction** (boolean) Determines whether or not the user's answers will be recorded to the LMS via cmi.interactions. Default is `true`. For further information, see the entry for `_shouldRecordInteractions` in the README for [adapt-contrib-spoor](https://github.com/adaptlearning/adapt-contrib-spoor).

**_items** (array): Each *item* represents one choice for the multiple choice question and contains values for **_graphic**, **text**, and **_shouldBeSelected**.  

>**text** (string): Optional text that is displayed as part of the multiple choice option.  

>**_shouldBeSelected** (boolean): Value can be `true` or `false`. Use `true` for items that must be selected for a correct answer. The value of **_selectable** must correspond to the number of **_items** where **_shouldBeSelected** is set to `true`. 

>**feedback** (string): This attribute is used only when the value for **_selectable** is set to `1` (i.e., radio button style questions). This text will be shown if the learner selects this item, and it is an incorrect answer. 

>**_graphic** (object): The image that appears as a possible answer. It contains values for **large**, **small**, **alt**, and **title**. 

>>**large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).  

>>**small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).

>>**alt** (string): This text becomes the image’s `alt` attribute.  

**_feedback** (object): If the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor) is enabled, these various texts will be displayed depending on the submitted answer. **_feedback**
contains values for three types of answers: **correct**, **_incorrect**, and **_partlyCorrect**. Some attributes are optional. If they are not supplied, the default that is noted below will be used.

>**correct** (string): Text that will be displayed when the submitted answer is correct.  

>**_incorrect** (object): Texts that will be displayed when the submitted answer is incorrect. It contains values that are displayed under differing conditions: **final** and **notFinal**. 

>>**final** (string): Text that will be displayed when the submitted answer is incorrect and no more attempts are permitted. 

>>**notFinal** (string): Text that will be displayed when the submitted answer is incorrect while more attempts are permitted. This is optional&mdash;if you do not supply it, the **_incorrect.final** feedback will be shown instead. 

>**_partlyCorrect** (object): Texts that will be displayed when the submitted answer is partially correct. It contains values that are displayed under differing conditions: **final** and **notFinal**.  

>>**final** (string): Text that will be displayed when the submitted answer is partly correct and no more attempts are permitted. This is optional&mdash;if you do not supply it, the **_incorrect.final** feedback will be shown instead.  

>>**notFinal** (string): Text that will be displayed when the submitted answer is partly correct while more attempts are permitted. This is optional&mdash;if you do not supply it, the **_incorrect.notFinal** feedback will be shown instead.  

### Accessibility
**Graphical Multiple Choice Question** has been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. This
label is not a visible element. It is utilized by assistive technology such as screen readers. Should the region's text need to be customised, it can be found within the **globals** object in [*properties.schema*](https://github.com/adaptlearning/adapt-contrib-gmcq/blob/master/properties.schema).   
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
No known limitations.   

----------------------------
**Version number:**  2.0   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a> 
**Framework versions:** 2.0  
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-gmcq/graphs/contributors)  
**Accessibility support:** WAI AA   
**RTL support:** yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 7+8), Safari for iPad (iOS 7+8), Safari 8, Opera    
