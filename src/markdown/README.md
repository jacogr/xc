## xc-markdown

Formats a markdown document into html

### usage

    <link rel="import" href="<path>/markdown/markdown.html"/>
    <xc-markdown markdown="<markdown>"></xc-markdown>

eg.

    <xc-markdown markdown="## a heading"></xc-markdown>

Alternatively you can embed the markdown in an enclosed `<script type="text/markdown">` block that will render it once, i.e. no change detection, eg.

    <xc-markdown>
      <script type="text/markdown">## another heading</script>
    </xc-markdown>
