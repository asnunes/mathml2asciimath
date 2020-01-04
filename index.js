const XmldocInterface = require('./interfaces/XmldocInterface');

class Mathml2Asciimath {
  constructor(html) {
    this.parsedElements = new XmldocInterface(html).parse();
  }

  convert() {
    console.log(JSON.stringify(this.parsedElements));
  }
}

const mathml = `
<root>
  <math>
      <mrow>
        <mrow>
          <msup>
            <mi>a</mi>
            <mn>2</mn>
          </msup>
          <mo>+</mo>
          <msup>
            <mi>b</mi>
            <mn>2</mn>
          </msup>
        </mrow>
          <mo>=</mo>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
  </math>
</root>
`;

console.log(new Mathml2Asciimath(mathml).convert());