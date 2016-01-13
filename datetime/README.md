## xc-datetime

### usage

    <link rel="import" href="<path>/datetime/datetime.html"/>
    <xc-datetime datetime="<datestring>" [format="<formatstr>"]></xc-datetime>

eg.

    <xc-datetime datetime="2016-01-01T18:45:01+02:00" format="(elapsed)"></xc-datetime>
    <xc-datetime datetime="2016-01-01T18:45:01+02:00" format="(longDate)"></xc-datetime>
    <xc-datetime datetime="2016-01-01T18:45:01+02:00"></xc-datetime>

Convenience functions with limited formatting is also available

    <xc-date datetime="<datetime>" [format="(<long|medium|text>)"]></xc-date>
    <xc-time datetime="<datetime>" [format="(<long|medium|text>)"]></xc-time>
    <xc-elapsed datetime="<datetime>"></xc-elapsed>
    <xc-remaining datetime="<datetime>"></xc-remaining>

formatstr can contain multiples of the following

- (elapsed) - Outputs an elapsed timestring
- (remaining) - Time remaining to a certain point
- (longDate) - 07 January 2016
- (longTime) - 09:41:07
- (long) - 07 January 2016 09:41:07
- (mediumDate) - 7 Jan 2016
- (mediumTime) - 09:41
- (medium) (default) - 7 Jan 2016 09:41
- (textDate) - seven January twenty sixteen
- (textTime) - six fifteen pm
- (text) - seven January twenty sixteen six fifteen pm
- other characters are formatted using the built-in moment.js formatter
