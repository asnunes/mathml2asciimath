const Mathml2asciimath = require('./index');

describe('given math string with mi tag', () => {
  test('parse mi to simple ascii variable', () => {
    const matml = '<root><math><mi>a</mi></math></root>';
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('a');
  });
});

describe('given math string with mo tag with simple operator', () => {
  test('parse mo just passing it operator as string', () => {
    const matml = `
      <root>
        <math>
          <mo>+</mo>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('+');
  });
});

describe('given math string with mrow tag', () => {
  test('parse mrow just wrapping its content', () => {
    const matml = `
    <root>
      <math>
        <mrow>
          <mn>2</mn>
          <mo>+</mo>
          <mn>2</mn>
        </mrow>
      </math>
    </root>
  `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('2+2');
  });
});

describe('given math string with msqrt tag', () => {
  test('parse msqrt wrapping its content inside sqrt ascii command', () => {
    const matml = `
    <root>
      <math>
        <msqrt>
          <mn>2</mn>
        </msqrt>
      </math>
    </root>
  `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('sqrt(2)');
  });
});

describe('given math string with msup tag containing single char contents', () => {
  test('parse msup joining its two char contents with \^', () => {
    const matml = `
      <root>
        <math>
          <msup>
            <mi>a</mi>
            <mn>2</mn>
          </msup>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('a^2');
  });
});

describe('given math string with msup tag containing multiple chars contents', () => {
  test('parse msup wrapping them using parentheses and joining its two strings contents into \^', () => {
    const matml = `
      <root>
        <math>
          <msup>
            <mrow>
              <mi>a</mi>
              <mo>+</mo>
              <mi>2</mi>
            </mrow>
            <mrow>
              <mi>b</mi>
              <mo>-</mo>
              <mi>3</mi>
            </mrow>
          </msup>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('(a+2)^(b-3)');
  });
});

describe('given math string with mfenced with single content and no attr', () => {
  test('parse mfenced wrapping it content inside parentheses', () => {
    const matml = `
      <root>
        <math>
        <mfenced>
          <mn>3</mn>
        </mfenced>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('(3)');
  });
});

describe('given math string with mfenced with more than one content and no attr', () => {
  test('parse mfenced wrapping it content inside parentheses and joining using commas', () => {
    const matml = `
      <root>
        <math>
        <mfenced>
          <mn>3</mn>
          <mn>2</mn>
          <mn>1</mn>
        </mfenced>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('(3,2,1)');
  });
});

describe('given math string with mfenced with single content, open and close attrs settled as {', () => {
  test('parse mfenced wrapping it content inside parentheses', () => {
    const matml = `
      <root>
        <math>
        <mfenced open='{' close='}'>
          <mn>3</mn>
        </mfenced>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('{3}');
  });
});

describe('given math string with mfenced with single content, open attr settled as { and void close tag' , () => {
  test('parse mfenced wrapping it content inside parentheses', () => {
    const matml = `
      <root>
        <math>
        <mfenced open='{' close >
          <mn>3</mn>
        </mfenced>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('{3:}');
  });
});

describe('given math string with mfrac containing single char contents' , () => {
  test('parse mfrac joining its two char contents with /', () => {
    const matml = `
      <root>
        <math>
          <mfrac>
            <mi>x</mi>
            <mn>3</mn>
          </mfrac>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    
    expect(result).toMatch('x/3');
  });
});

describe('given math string with mfrac containing multiple char contents' , () => {
  test('parse mfrac joining its two contents with / wrapping them into parentheses', () => {
    const matml = `
      <root>
        <math>
          <mfrac>
            <mrow>
              <mi>a</mi>
              <mo>+</mo>
              <mi>2</mi>
            </mrow>
            <mrow>
              <mi>b</mi>
              <mo>-</mo>
              <mi>3</mi>
            </mrow>
          </mfrac>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    expect(result).toMatch('(a+2)/(b-3)');
  });
});

describe('given math string with mfrac containing two contents with bevelled attribute marked as true' , () => {
  test('parse mfrac joining its two char contents with //', () => {
    const matml = `
      <root>
        <math>
          <mfrac bevelled="true">
            <mn>1</mn>
            <mrow>
              <msup>
                <mi>x</mi>
                <mn>3</mn>
              </msup>
              <mo>+</mo>
              <mfrac>
                <mi>x</mi>
                <mn>3</mn>
              </mfrac>
            </mrow>
          </mfrac>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    expect(result).toMatch('1//(x^3+x/3)');
  });
});


describe('given math string with mroot containing two content' , () => {
  test('parse mroot tag wrapping its contents inside root(x)(y), where x is the second mroot\'s child and y is the first one', () => {
    const matml = `
      <root>
        <math>
          <mroot>
            <mi>z</mi>
            <mn>3</mn>
          </mroot> 
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(matml).convert();
    console.log(result);
    expect(result).toMatch('root(3)(z)');
  });
});

describe('given math string with mpadded tag', () => {
  test('parse mpadded just wrapping its content', () => {
    const matml = `
      <root>
        <math>
          <mpadded>
            <mn>2</mn>
            <mo>+</mo>
            <mn>2</mn>
          </mpadded>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('2+2');
  });
});

describe('given math string with maction tag', () => {
  test('parse maction just joining its content separating them by ;', () => {
    const matml = `
      <root>
        <math>
          <maction>
            <mrow>
              <mi>a</mi>
              <mo>+</mo>
              <mi>2</mi>
            </mrow>
            <mrow>
              <mi>b</mi>
              <mo>-</mo>
              <mi>3</mi>
            </mrow>
          </maction>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('a+2; b-3');
  });
});

describe('given math string with menclose tag without notation attribute', () => {
  test('parse menclose tag just joining its content', () => {
    const matml = `
      <root>
        <math>
          <menclose>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('a+2');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'longdiv\'', () => {
  test('parse menclose tag just wrapping its content in a ) followed by bar command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='longdiv'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch(')bar(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'actuarial\'', () => {
  test('parse menclose tag just wrapping its content bar command followed by |', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='actuarial'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('bar(a+2)|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'box\'', () => {
  test('parse menclose tag wrapping its content in | followed bar and ul commands followed by another |', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='box'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('|ul(bar(a+2))|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'roundedbox\'', () => {
  test('parse menclose tag wrapping its content in ( followed bar and ul commands followed by )', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='roundedbox'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('(ul(bar(a+2)))');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'circle\'', () => {
  test('parse menclose tag wrapping its content in ( followed bar and ul commands followed by )', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='circle'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('(ul(bar(a+2)))');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'left\'', () => {
  test('parse menclose placing | followed by content', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='left'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('|a+2');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'right\'', () => {
  test('parse menclose placing content followed by |', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='right'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('a+2|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'top\'', () => {
  test('parse menclose placing content as argument of bar command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='top'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('bar(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'bottom\'', () => {
  test('parse menclose placing content as argument of ul command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='bottom'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('ul(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'updiagonalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='updiagonalstrike'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'downdiagonalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='downdiagonalstrike'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'verticalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='verticalstrike'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'horizontalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const matml = `
      <root>
        <math>
          <menclose notation='horizontalstrike'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(matml).convert();
    console.log(result);

    expect(result).toMatch('cancel(a+2)');
  });
});