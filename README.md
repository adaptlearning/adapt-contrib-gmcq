# adapt-contrib-gmcq

**Graphical Multiple Choice Question (GMCQ)** is a *question component* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).

<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/gmcq01.gif" alt="graphical multiple choice question in action" >

It presents possible answers in the form of graphics or images. **GMCQ** is a variation on [**MCQ**](https://github.com/adaptlearning/mcq/wiki). It can be configured with a single correct answer or multiple correct answers. Upon submission, feedback is provided via the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor), if installed. Feedback can be provided for correct, incorrect and partially correct answers. The number of attempts allowed may be configured.

[Visit the **GMCQ** wiki](https://github.com/adaptlearning/adapt-contrib-gmcq/wiki) for more information about its functionality and for explanations of key properties.

## Installation

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

**\_component** (string): This value must be: `gmcq`.

**\_classes** (string): CSS class name to be applied to **GMCQ**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**\_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.

**ariaQuestion** (string): This will be read out by screen readers instead of reading the title, body & instruction fields when focusing on the group or radiogroup.

**\_attempts** (integer): This specifies the number of times a learner is allowed to submit an answer. The default is `1`.

**\_shouldDisplayAttempts** (boolean): Determines whether or not the text set in **remainingAttemptText** and **remainingAttemptsText** will be displayed. These two attributes are part of the [core buttons](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons) attribute group. The default is `false`.

**\_hasItemScoring** (boolean): When `false`, this question scores 0 for incorrect and `_questionWeight` for correct. When `true`, this question scores by summing the `_score` of the selected items.

**\_questionWeight** (number): When `_hasItemScoring` is `false`, this is the question score for a correct response. This number is used in calculations of the final score reported to the LMS.

**\_isRandom** (boolean): Setting this value to `true` will cause the **\_items** to appear in a random order each time the component is loaded. The default is `false`.

**\_selectable** (number): Defines the number of **\_items**, or answers, that can be selected. If the value of **\_selectable** is `1`, **\_items** will be presented with HTML radio buttons. If the value is greater than `1`, they will be presented with HTML checkboxes. This number can be smaller, match or exceed the number of **\_items** whose **_shouldBeSelected** is set to `true`. The default is `1`.

**\_canShowModelAnswer** (boolean): Setting this to `false` prevents the [**\_showCorrectAnswer** button](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons) from being displayed. The default is `true`.

**\_canShowFeedback** (boolean): Setting this to `false` disables feedback, so it is not shown to the user. The default is `true`.

**\_canShowMarking** (boolean): Setting this to `false` prevents ticks and crosses being displayed on question completion. The default is `true`.

**\_recordInteraction** (boolean) Determines whether or not the learner's answers will be recorded to the LMS via cmi.interactions. Default is `true`. For further information, see the entry for `_shouldRecordInteractions` in the README for [adapt-contrib-spoor](https://github.com/adaptlearning/adapt-contrib-spoor).

**\_columns** (number): Defines the number of columns wide the **\_items** are displayed in. If the value of **\_columns** is `2`, each **\_items** will be 50% wide. Similarly, if the value of **\_columns** is `3`, each **\_items** will be 33.3% wide. In mobile view, the width of each **\_items** is 50%.

**\_isRound** (boolean): If set to `true`, the item images will inherit a 50% border radius. Ideal for use with images that are square that are required to be round. The default is `false`.

**\_items** (array): Each *item* represents one choice for the multiple choice question and contains values for **text**, **\_shouldBeSelected**, **feedback**, and **\_graphic**.

>**text** (string): Optional text that is displayed as part of the multiple choice option.

>**altText** (string): This will be read out by screen readers instead of reading `text`.
Optional for providing alternative text, for example, to specify how a word should be pronounced.

>**\_shouldBeSelected** (boolean): Value can be `true` or `false`. Use `true` for items that must be selected for a correct answer. The value of **\_selectable** can be smaller, match or exceed the number of **\_items** where **\_shouldBeSelected** is set to `true`.

>**\_isPartlyCorrect** (boolean): Determines whether the *item* when selected marks the question as partly correct. Value can be `true` or `false`. Default is `false`.

>**feedback** (string): This attribute is used only when the value for **\_selectable** is set to `1` (i.e., radio button style questions). This text will be shown if the learner selects this item, and it is an incorrect answer.

>**\_graphic** (object): The image that appears as a possible answer. It contains values for **large**, **small**, **alt**, and **title**.

>>**large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).

>>**small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).

>>**alt** (string): The alternative text for this image. Assign [alt text](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) to images that convey course content only. Avoid duplication if the item **text** already provides context and leave blank.

>>**attribution** (string): Optional text to be displayed as an [attribution](https://wiki.creativecommons.org/Best_practices_for_attribution). By default it is displayed below the image. Adjust positioning by modifying CSS. Text can contain HTML tags, e.g., `Copyright © 2015 by <b>Lukasz 'Severiaan' Grela</b>`.

>**\_score** (number): If `_hasItemScoring` is `true`, when selected, item scores are summed to give the question score.

**\_feedback** (object): If the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor) is enabled, these various texts will be displayed depending on the submitted answer. **\_feedback**
contains values for three types of answers: **correct**, **\_incorrect**, and **\_partlyCorrect**. Some attributes are optional. If they are not supplied, the default that is noted below will be used.

>**title** (string): Title text for the feedback that will be displayed when the question is submitted.

>**altTitle** (string): This will be read out by screen readers as an alternative heading if no visual heading is included.

>**correct** (string): Text that will be displayed when the submitted answer is correct.

>**\_incorrect** (object): Texts that will be displayed when the submitted answer is incorrect. It contains values that are displayed under differing conditions: **final** and **notFinal**.

>>**final** (string): Text that will be displayed when the submitted answer is incorrect and no more attempts are permitted.

>>**notFinal** (string): Text that will be displayed when the submitted answer is incorrect while more attempts are permitted. This is optional&mdash;if you do not supply it, the **\_incorrect.final** feedback will be shown instead.

>**\_partlyCorrect** (object): Texts that will be displayed when the submitted answer is partially correct. It contains values that are displayed under differing conditions: **final** and **notFinal**.

>>**final** (string): Text that will be displayed when the submitted answer is partly correct and no more attempts are permitted. This is optional&mdash;if you do not supply it, the **\_incorrect.final** feedback will be shown instead.

>>**notFinal** (string): Text that will be displayed when the submitted answer is partly correct while more attempts are permitted. This is optional&mdash;if you do not supply it, the **\_incorrect.notFinal** feedback will be shown instead.

### Notes
If you don't need this component to display a different image for large/small screen sizes, you can use **src** (instead of **large** and **small**) to specify an image that will be displayed for all screen sizes.

## Accessibility
**Graphical Multiple Choice Question** has been assigned a descriptive label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**.

When **Graphical Multiple Choice Question** is used with Adapt Framework v5.12.0 (or better), it supports announcing the correct/learner answer to screen readers (via an an [ARIA Live Region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)) when the Correct Answer button is toggled by the learner. The following attributes are used to provide this functionality: **ariaCorrectAnswer**, **ariaCorrectAnswers**, **ariaUserAnswer**, **ariaUserAnswers**.

These ARIA labels are not visible elements; they are used by assistive technology (such as screen readers). Should any of these labels need to be customised or translated, they can be found within the `_globals._components._gmcq` object in **course.json** (or Project settings > Globals in the Adapt Authoring Tool).
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

No known limitations.

----------------------------
<a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-gmcq/graphs/contributors)
**Accessibility support:** WAI AA
**RTL support:** Yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 14 for macOS/iOS/iPadOS, Opera
