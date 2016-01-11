## xc-datetime

### acknowledgements

parts mutilated & adapted from https://github.com/github/time-elements/blob/master/time-elements.js

### usage

`<link rel="import" href="<path>/datetime/datetime.html"/>
<xc-datetime datetime="<datestring>" [format="<formatstr>"]></xc-datetime>`

eg.
  `<xc-datetime datetime="2016-01-01T18:45:01+02:00" format="-elapsed"></xc-datetime>`
  `<xc-datetime datetime="2016-01-01T18:45:01+02:00" format="-longDate"></xc-datetime>`
  `<xc-datetime datetime="2016-01-01T18:45:01+02:00"></xc-datetime>`

Convenience functions with limited formatting is also available

`<xc-date datetime="<datetime>" [format="-<long|medium|text>"]></xc-date>
<xc-time datetime="<datetime>" [format="-<long|medium|text>"]></xc-time>
<xc-elapsed datetime="<datetime>"></xc-elapsed>
<xc-remaining datetime="<datetime>"></xc-remaining>`

formatstr can contain multiples of the following

  -elapsed - Outputs an elapsed timestring
  -remaining - Time remaining to a certain point
  -longDate - 07 January 2016
  -longTime - 09:41:07
  -long - 07 January 2016 09:41:07
  -mediumDate - 7 Jan 2016
  -mediumTime - 09:41
  -medium (default) - 7 Jan 2016 09:41
  -textDate - seven January twenty sixteen
  -textTime - six fifteen pm
  -text - seven January twenty sixteen six fifteen pm

  %<character> -
    %% - %
    %a - day of week (3 characters)
    %A - day of week (full)
    %b - month (3 characters)
    %B - month (full)
    %c - century
    %d - date
    %D - date (zero padded)
    %h - hour
    %H - hour (zero padded)
    %l - 12 hour hours
    %I - 12 hours hours (zero padded)
    %m - month (zero padded)
    %M - minute (zero padded)
    %p - am/pm
    %P - AM/PM
    %s - seconds
    %S - seconds (zero padded)
    %t - time.toString()
    %w - weekday
    %y - year (2 digits)
    %Y - year (4 digits)
    %z - timezone
    %Z - timezone
