# mathml2asciimath

[![npm version](https://badge.fury.io/js/mathml2asciimath.svg)](https://badge.fury.io/js/mathml2asciimath)

It converts [MathML](https://en.wikipedia.org/wiki/MathML) to [ASCIIMath](http://asciimath.org/). 

Please notice that ASCIIMath represents only a subset of MathML context, therefore some information may be lost in the process. In general, if it can be represented in ASCIIMath, it will be well converted.

## Instalation

If you use NPM

````
npm install mathml2asciimath --save
````

If you use Yarn

````
yarn add mathml2asciimath
````

## Usage



````javascript
const Mathml2asciimath = require('mathml2asciimath');

const mathml = `
      <math>
        <mrow>
          <mn>a</mn>
          <mo>+</mo>
          <mn>b</mn>
        </mrow>
      </math>
      `;

new Mathml2asciimath(mathml).convert();
// => a + b
`````

````javascript
const Mathml2asciimath = require('mathml2asciimath');

const mathml = `
    <math>
        <mrow>
            <mi>A</mi>
            <mo>=</mo>
            <mfenced open = "[" close="]">
            <mtable>
                <mtr>
                <mtd><mi>x</mi></mtd>
                <mtd><mi>y</mi></mtd>
                </mtr>
                <mtr>
                <mtd><mi>z</mi></mtd>
                <mtd><mi>w</mi></mtd>
                </mtr>
            </mtable>
            </mfenced>
        </mrow>
    </math>
    `;

new Mathml2asciimath(mathml).convert();
// => A = [(x, y), (z, w)]
`````

Please read ```index.test.js``` file for more use cases.
