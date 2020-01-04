const XmldocInterface = require('./interfaces/XmldocInterface');
const AsciiInterface = require('./interfaces/AsciiInterface');

class Mathml2Asciimath {
  constructor(html) {
    this.parsedXml = new XmldocInterface(html).parse();
    this.parsedAscii = new AsciiInterface(this.parsedXml).parse();
  }

  convert() {
    console.log(this.parsedAscii.map(tag => tag.toAsciimath()).join(''));
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