const Mathml2asciimath = require('./index');

describe('given math string with mi tag', () => {
  test('parse mi to simple ascii variable', () => {
    const mathml = '<root><math><mi>a</mi></math></root>';
  
    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('a');
  });
});

describe('given math tag outside any other tag', () => {
  test('parse iner math', () => {
    const mathml = '<math><mi>b</mi></math>';
  
    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('b');
  });
});

describe('given math string with mi tag with space on it', () => {
  test('should trim empty space', () => {
    const mathml = '<root><math><mi> a </mi></math></root>';

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('a');
  });
});

describe('given math string with mo tag with simple operator', () => {
  test('parse mo just passing it operator as string', () => {
    const mathml = `
      <root>
        <math>
          <mo>+</mo>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('+');
  });
});

describe('given math string with mrow tag', () => {
  test('parse mrow just wrapping its content', () => {
    const mathml = `
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
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('2 + 2');
  });
});

describe('given math string with msqrt tag', () => {
  test('parse msqrt wrapping its content inside sqrt ascii command', () => {
    const mathml = `
    <root>
      <math>
        <msqrt>
          <mn>2</mn>
        </msqrt>
      </math>
    </root>
  `;
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('sqrt(2)');
  });
});

describe('given math string with msup tag containing single char contents', () => {
  test('parse msup joining its two char contents with \^ and wrapping in parentheses', () => {
    const mathml = `
      <root>
        <math>
          <msup>
            <mi>a</mi>
            <mn>2</mn>
          </msup>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('a^(2)');
  });
});

describe('given math string with msup tag containing multiple chars contents', () => {
  test('parse msup wrapping them using parentheses and joining its two strings contents into \^', () => {
    const mathml = `
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
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('(a + 2)^(b - 3)');
  });
});

describe('given math string with mfenced with single content and no attr', () => {
  test('parse mfenced wrapping it content inside parentheses', () => {
    const mathml = `
      <root>
        <math>
        <mfenced>
          <mn>3</mn>
        </mfenced>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('(3)');
  });
});

describe('given math string with mfenced with more than one content and no attr', () => {
  test('parse mfenced wrapping it content inside parentheses and joining using commas', () => {
    const mathml = `
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
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('(3,2,1)');
  });
});

describe('given math string with mfenced with three contents with separator attribute \';;;\'', () => {
  test('parse mfenced wrapping it content inside parentheses and joining using \';\'', () => {
    const mathml = `
      <root>
        <math>
        <mfenced separators=';;;'>
          <mn>3</mn>
          <mn>2</mn>
          <mn>1</mn>
        </mfenced>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('(3;2;1)');
  });
});

describe('given math string with mfenced with four contents with separator attribute \';.\'', () => {
  test('parse mfenced wrapping it content inside parentheses and joining using \';\' for the first, \'.\' for the second on', () => {
    const mathml = `
      <root>
        <math>
        <mfenced separators=';.'>
          <mn>3</mn>
          <mn>2</mn>
          <mn>1</mn>
          <mn>7</mn>
        </mfenced>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('(3;2.1.7)');
  });
});

describe('given math string with mfenced with four contents with separator attribute as empty string', () => {
  test('parse mfenced wrapping it content inside parentheses and joining using commas', () => {
    const mathml = `
      <root>
        <math>
        <mfenced separators=''>
          <mn>3</mn>
          <mn>2</mn>
          <mn>1</mn>
          <mn>7</mn>
        </mfenced>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('(3,2,1,7)');
  });
});

describe('given math string with mfenced with single content, open and close attrs settled as {', () => {
  test('parse mfenced wrapping it content inside parentheses', () => {
    const mathml = `
      <root>
        <math>
        <mfenced open='{' close='}'>
          <mn>3</mn>
        </mfenced>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('{3}');
  });
});

describe('given math string with mfenced with single content, open attr settled as { and void close tag' , () => {
  test('parse mfenced wrapping it content inside parentheses', () => {
    const mathml = `
      <root>
        <math>
        <mfenced open='{' close >
          <mn>3</mn>
        </mfenced>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('{3:}');
  });
});

describe('given math string with mfrac containing single char contents' , () => {
  test('parse mfrac joining its two char contents with /', () => {
    const mathml = `
      <root>
        <math>
          <mfrac>
            <mi>x</mi>
            <mn>3</mn>
          </mfrac>
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(mathml).convert();
    
    expect(result).toMatch('x/3');
  });
});

describe('given math string with mfrac containing multiple char contents' , () => {
  test('parse mfrac joining its two contents with / wrapping them into parentheses', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();
    expect(result).toMatch('(a + 2)/(b - 3)');
  });
});

describe('given math string with mfrac containing two contents with bevelled attribute marked as true' , () => {
  test('parse mfrac joining its two char contents with //', () => {
    const mathml = `
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
  
    const result = new Mathml2asciimath(mathml).convert();
    expect(result).toMatch('1//(x^(3) + x/3)');
  });
});


describe('given math string with mroot containing two content' , () => {
  test('parse mroot tag wrapping its contents inside root(x)(y), where x is the second mroot\'s child and y is the first one', () => {
    const mathml = `
      <root>
        <math>
          <mroot>
            <mi>z</mi>
            <mn>3</mn>
          </mroot> 
        </math>
      </root>
    `;
  
    const result = new Mathml2asciimath(mathml).convert();
    expect(result).toMatch('root(3)(z)');
  });
});

describe('given math string with mpadded tag', () => {
  test('parse mpadded just wrapping its content', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('2 + 2');
  });
});

describe('given math string with maction tag', () => {
  test('parse maction just joining its content separating them by ;', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('a + 2; b - 3');
  });
});

describe('given math string with menclose tag without notation attribute', () => {
  test('parse menclose tag just joining its content', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('a+2');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'longdiv\'', () => {
  test('parse menclose tag just wrapping its content in a ) followed by bar command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch(')bar(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'actuarial\'', () => {
  test('parse menclose tag just wrapping its content bar command followed by |', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('bar(a+2)|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'box\'', () => {
  test('parse menclose tag wrapping its content in | followed bar and ul commands followed by another |', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('|ul(bar(a+2))|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'roundedbox\'', () => {
  test('parse menclose tag wrapping its content in ( followed bar and ul commands followed by )', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('(ul(bar(a+2)))');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'circle\'', () => {
  test('parse menclose tag wrapping its content in ( followed bar and ul commands followed by )', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('(ul(bar(a+2)))');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'left\'', () => {
  test('parse menclose placing | followed by content', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('|a+2');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'right\'', () => {
  test('parse menclose placing content followed by |', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('a+2|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'top\'', () => {
  test('parse menclose placing content as argument of bar command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('bar(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'bottom\'', () => {
  test('parse menclose placing content as argument of ul command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('ul(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'updiagonalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'downdiagonalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'verticalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'horizontalstrike\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const mathml = `
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

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('cancel(a+2)');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'madruwb\'', () => {
  test('parse menclose placing content as argument of ul command followed by |', () => {
    const mathml = `
      <root>
        <math>
          <menclose notation='madruwb'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('ul(a+2)|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'updiagonalarrow\'', () => {
  test('parse menclose placing content as argument of cancel command', () => {
    const mathml = `
      <root>
        <math>
          <menclose notation='updiagonalarrow'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('cancel(a+2)|');
  });
});

describe('given math string with menclose tag with notation attribute equals to \'phasorangle\'', () => {
  test('parse menclose placing \/ followed by content as argument of ul command', () => {
    const mathml = `
      <root>
        <math>
          <menclose notation='phasorangle'>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </menclose>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('\/ul(a+2)');
  });
});

describe('given math string with merror tag', () => {
  test('parse merror placing its content inside color(red) followed by |, ul, bar commands and finally |', () => {
    const mathml = `
      <root>
        <math>
          <merror>
            <mi>a</mi>
            <mo>+</mo>
            <mi>2</mi>
          </merror>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toMatch('color(red)(|ul(bar(a+2))|)');
  });
});

describe('given math string with mglyph tag', () => {
  test('ignore it', () => {
    const mathml = `
      <root>
        <math>
          <mi><mglyph src="my-glyph.png" alt="my glyph"/></mi>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('');
  });
});

describe('given math string with mover tag where its first child is a mrow and second is mo containing ⏞', () => {
  test('parce wrapping it content inside obrace command', () => {
    const mathml = `
      <root>
        <math>
          <mover accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>⏞</mo>
          </mover>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('obrace(x + y + z)');
  });
});

describe('given math string with mover tag where its first child is a mrow and second is mo containing &#x23DE;', () => {
  test('parce wrapping it content inside obrace command', () => {
    const mathml = `
      <root>
        <math>
          <mover accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>&#x23DE;</mo>
          </mover>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('obrace(x + y + z)');
  });
});

describe('given math string with mover tag where its first child is a mrow and second is mo containing ⥨, an accent without ascii command', () => {
  test('parce wrapping it content inside overset command', () => {
    const mathml = `
      <root>
        <math>
          <mover accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>⥨</mo>
          </mover>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('overset(harr)(x + y + z)');
  });
});

describe('given math string with mover tag where its first child is a mrow and second is mo containing &#x2968;, an accent without ascii command', () => {
  test('parce wrapping it content inside overset command', () => {
    const mathml = `
      <root>
        <math>
          <mover accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>&#x2968;</mo>
          </mover>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('overset(harr)(x + y + z)');
  });
});

describe('given math string with mphantom tag', () => {
  it('replaces every ascii character inside tag to empty space and then normalize it', () => {
    const mathml = `
      <root>
        <math>
          <mrow>
            <mi> x </mi>
            <mo> + </mo>
            <mphantom>
              <mi> y </mi>
              <mo> + </mo>
            </mphantom>
            <mi> z </mi>
          </mrow>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('x + z');
  });
});

describe('given math string with msub tag', () => {
  it('join its children using _ and wrapping in parentheses', () => {
    const mathml = `
      <root>
        <math>
          <msub>
            <mi>X</mi>
            <mn>1</mn>
          </msub>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('X_(1)');
  });
});

describe('given math string with msubsup tag', () => {
  it('join its children using _ and ^ and wrapping in parentheses', () => {
    const mathml = `
      <root>
        <math>
          <msubsup>
            <mo> &#x222B; </mo>
            <mn> 0 </mn>
            <mn> 1 </mn>
          </msubsup>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('int_(0)^(1)');
  });
});

describe('given math string with mtable, mtr and mtd tag', () => {
  it('returns a matrix representation in asciimath', () => {
    const mathml = `
    <root>
      <math xmlns = "http://www.w3.org/1998/Math/MathML">
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
    </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('A = [(x, y), (z, w)]');
  });
});

describe('given math string with mtext', () => {
  it('wrap its content inside text command', () => {
    const mathml = `
    <root>
      <math xmlns = "http://www.w3.org/1998/Math/MathML">
        <mtext> Theorem of Pythagoras </mtext>
      </math>
    </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('text( Theorem of Pythagoras )');
  });
});

describe('given math string with munder tag where its first child is a mrow and second is mo containing ⏞', () => {
  it('wrap its content inside ubrace command', () => {
    const mathml = `
    <root>
      <math xmlns = "http://www.w3.org/1998/Math/MathML">
        <munder>
          <mrow>
            <mi> x </mi>
            <mo> + </mo>
            <mi> y </mi>
            <mo> + </mo>
            <mi> z </mi>
          </mrow>
          <mo>⏟</mo>
        </munder>
      </math>
    </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('ubrace(x + y + z)');
  });
});

describe('given math string with munder tag where its first child is a mrow and second is mo containing &#x23DE;', () => {
  test('parce wrapping it content inside ubrace command', () => {
    const mathml = `
      <root>
        <math>
          <munder accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>&#x23DF;</mo>
          </munder>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('ubrace(x + y + z)');
  });
});

describe('given math string with munder tag where its first child is a mrow and second is mo containing ⥨, an accent without ascii command', () => {
  test('parce wrapping it content inside underset command', () => {
    const mathml = `
      <root>
        <math>
          <munder accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>⥨</mo>
          </munder>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('underset(harr)(x + y + z)');
  });
});

describe('given math string with munder tag where its first child is a mrow and second is mo containing &#x2968;, an accent without ascii command', () => {
  test('parce wrapping it content inside underset command', () => {
    const mathml = `
      <root>
        <math>
          <munder accent="true">
            <mrow>
              <mi> x </mi>
              <mo> + </mo>
              <mi> y </mi>
              <mo> + </mo>
              <mi> z </mi>
            </mrow>
            <mo>&#x2968;</mo>
          </munder>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('underset(harr)(x + y + z)');
  });
});

describe('given math string with munderover tag with three contents', () => {
  test('wrap it inside underset and overset commands', () => {
    const mathml = `
      <root>
        <math>
          <munderover>
            <mo> A</mo>
            <mn> 0 </mn>
            <mi> &#x221E;</mi>
          </munderover>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('underset(0)(overset(oo)(A))');
  });
});

describe('given math string with munderover tag with three contents and especial operator', () => {
  test('handle it as it were an subsup tag', () => {
    const mathml = `
      <root>
        <math>
          <munderover>
            <mo> &#x222B;</mo>
            <mn> 0 </mn>
            <mi> &#x221E;</mi>
          </munderover>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('int_(0)^(oo)');
  });
});

describe('given math string with whitespaces', () => {
  test('preserves whitespace', () => {
    const mathml = `
      <root>
        <math>
          <mi>k</mi>
          <mi>m</mi>
          <mi> </mi>
          <mn>95</mn>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('km\\ 95');
  });
});

describe('given math string with 2 whitespaces inside a mi tag', () => {
  test('normalize whitespace', () => {
    const mathml = `
      <root>
        <math>
          <mi>k</mi>
          <mi>m</mi>
          <mi>  </mi>
          <mn>95</mn>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe('km\\ 95');
  });
});


describe('given math string with partial function', () => {
  test('return partial function with { and :}', () => {
    const mathml = `
      <root>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mi>f</mi>
          <mfenced separators="|">
            <mrow>
              <mi>x</mi>
            </mrow>
          </mfenced>
          <mo>=</mo>
          <mfenced open="{" close="" separators="|">
            <mrow>
              <mtable>
                <mtr>
                  <mtd>
                    <mrow>
                      <maligngroup></maligngroup>
                      <msup>
                        <mrow>
                          <mi>x</mi>
                        </mrow>
                        <mrow>
                          <mn>2</mn>
                        </mrow>
                      </msup>
                      <mo>,</mo>
                      <mi>x</mi>
                      <mo>&lt;</mo>
                      <mn>0</mn>
                    </mrow>
                  </mtd>
                </mtr>
                <mtr>
                  <mtd>
                    <mrow>
                      <maligngroup></maligngroup>
                      <msup>
                        <mrow>
                          <mi>e</mi>
                        </mrow>
                        <mrow>
                          <mi>x</mi>
                        </mrow>
                      </msup>
                      <mo>,</mo>
                      <mi>x</mi>
                      <mo>≥</mo>
                      <mn>0</mn>
                    </mrow>
                  </mtd>
                </mtr>
              </mtable>
            </mrow>
          </mfenced>
        </math>
      </root>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`f(x)={( x^(2) , x < 0), ( e^(x) , x ge 0):}`);
  });
});

describe('munder tag with special mi operator', () => {
  test('returns as a simple sub tag', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mrow>
        <mrow>
          <munder>
            <mrow>
              <mi mathvariant="normal">lim</mi>
            </mrow>
            <mrow>
              <mi>x</mi>
              <mo>→</mo>
              <mn>3</mn>
            </mrow>
          </munder>
        </mrow>
        <mrow>
          <msup>
            <mrow>
              <mi>x</mi>
            </mrow>
            <mrow>
              <mn>2</mn>
            </mrow>
          </msup>
          <mo>=</mo>
          <mo>?</mo>
        </mrow>
      </mrow>
    </math>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`lim_(x rarr 3) x^(2) = ?`);
  });
});

describe('munder tag with special mi operator', () => {
  test('returns as a simple sub tag', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mrow>
        <munderover>
          <mo stretchy="false">∑</mo>
          <mrow>
            <mi>n</mi>
            <mo>=</mo>
            <mn>1</mn>
          </mrow>
          <mrow>
            <mi>∞</mi>
          </mrow>
        </munderover>
        <mrow>
          <msub>
            <mrow>
              <mi>a</mi>
            </mrow>
            <mrow>
              <mi>n</mi>
            </mrow>
          </msub>
        </mrow>
      </mrow>
    </math>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`sum_(n = 1)^(oo) a_(n)`);
  });
});

describe('mtable tag with other mtable tag nested inside', () => {
  test('remove inner mtable and puts its content inside td and tr', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <msub>
        <mrow>
          <mi>A</mi>
        </mrow>
        <mrow>
          <mi>m</mi>
          <mo>×</mo>
          <mi>n</mi>
        </mrow>
      </msub>
      <mo>=</mo>
      <mfenced separators="|">
        <mrow>
          <mtable>
            <mtr>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <msub>
                        <mrow>
                          <mi>a</mi>
                        </mrow>
                        <mrow>
                          <mn>11</mn>
                        </mrow>
                      </msub>
                    </mtd>
                    <mtd>
                      <msub>
                        <mrow>
                          <mi>a</mi>
                        </mrow>
                        <mrow>
                          <mn>12</mn>
                        </mrow>
                      </msub>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <mo>…</mo>
                    </mtd>
                    <mtd>
                      <mo>…</mo>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
              <mtd>
                <msub>
                  <mrow>
                    <mi>a</mi>
                  </mrow>
                  <mrow>
                    <mn>1</mn>
                    <mi>n</mi>
                  </mrow>
                </msub>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <msub>
                        <mrow>
                          <mi>a</mi>
                        </mrow>
                        <mrow>
                          <mn>21</mn>
                        </mrow>
                      </msub>
                    </mtd>
                    <mtd>
                      <msub>
                        <mrow>
                          <mi>a</mi>
                        </mrow>
                        <mrow>
                          <mn>22</mn>
                        </mrow>
                      </msub>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <mo>⋱</mo>
                    </mtd>
                    <mtd>
                      <mi> </mi>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
              <mtd>
                <msub>
                  <mrow>
                    <mi>a</mi>
                  </mrow>
                  <mrow>
                    <mn>2</mn>
                    <mi>n</mi>
                  </mrow>
                </msub>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <mtable>
                        <mtr>
                          <mtd>
                            <mo>⋮</mo>
                            <mi> </mi>
                            <mi> </mi>
                            <mi> </mi>
                            <mi> </mi>
                          </mtd>
                          <mtd>
                            <mo>⋮</mo>
                          </mtd>
                        </mtr>
                      </mtable>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mtable>
                        <mtr>
                          <mtd>
                            <msub>
                              <mrow>
                                <mi>a</mi>
                              </mrow>
                              <mrow>
                                <mi>m</mi>
                                <mn>1</mn>
                              </mrow>
                            </msub>
                          </mtd>
                          <mtd>
                            <msub>
                              <mrow>
                                <mi>a</mi>
                              </mrow>
                              <mrow>
                                <mi>m</mi>
                                <mn>2</mn>
                              </mrow>
                            </msub>
                          </mtd>
                        </mtr>
                      </mtable>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <mtable>
                        <mtr>
                          <mtd>
                            <mi> </mi>
                          </mtd>
                          <mtd>
                            <mo>⋱</mo>
                          </mtd>
                        </mtr>
                      </mtable>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mtable>
                        <mtr>
                          <mtd>
                            <mo>…</mo>
                          </mtd>
                          <mtd>
                            <mo>…</mo>
                          </mtd>
                        </mtr>
                      </mtable>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
              <mtd>
                <mtable>
                  <mtr>
                    <mtd>
                      <mo>⋮</mo>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <msub>
                        <mrow>
                          <mi>a</mi>
                        </mrow>
                        <mrow>
                          <mi>m</mi>
                          <mi>n</mi>
                        </mrow>
                      </msub>
                    </mtd>
                  </mtr>
                </mtable>
              </mtd>
            </mtr>
          </mtable>
        </mrow>
      </mfenced>
      <mi> </mi>
    </math>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`A_(m xx n)=(((a_(11), a_(12)), (..., ...), a_(1 n)), ((a_(21), a_(22)), (ddots, \\ ), a_(2 n)), (((vdots\\ \\ \\ \\ , vdots))((a_(m 1), a_(m 2))), ((\\ , ddots))((..., ...)), (vdots)(a_(m n))))\\ `);
  });
});

describe('mmultiscripts tag with down and up children', () => {
  test('returns and subscript follow by base and superscript', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mmultiscripts>
        <mrow>
          <mi>N</mi>
          <mi>a</mi>
        </mrow>
        <mprescripts />
        <mrow>
          <mn>11</mn>
        </mrow>
        <mrow>
          <mi>+</mi>
        </mrow>
      </mmultiscripts>
    </math>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`{::}_(11)N a^(+)`);
  });
});

describe('mmultiscripts tag with only prescript', () => {
  test('returns and subscript follow by base', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mmultiscripts>
        <mrow>
          <mi>N</mi>
          <mi>a</mi>
        </mrow>
        <mprescripts />
        <mrow>
          <mn>11</mn>
        </mrow>
      </mmultiscripts>
    </math>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`{::}_(11)N a`);
  });
});

describe('many tags with text', () => {
  test('escape spaces with backslashes', () => {
    const mathml = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mrow>
        <mi>&#xA0;</mi>
        <mi>&#xA0;</mi>
        <mi>&#xA0;</mi>
        <mi>&#xA0;</mi>
        <mi>t</mi>
        <mi>o</mi>
        <mi>d</mi>
        <mi>o</mi>
        <mi>s</mi>
        <mi>&#xA0;</mi>
        <mi>o</mi>
        <mi>s</mi>
        <mi>&#xA0;</mi>
        <mi>v</mi>
        <mi>a</mi>
        <mi>l</mi>
        <mi>o</mi>
        <mi>r</mi>
        <mi>e</mi>
        <mi>s</mi>
        <mi>&#xA0;</mi>
        <mi>e</mi>
        <mi>m</mi>
        <mi>&#xA0;</mi>
        <mi>m</mi>
        <mi>&#xF3;</mi>
        <mi>d</mi>
        <mi>u</mi>
        <mi>l</mi>
        <mi>o</mi>
        <mo>!</mo>
      </mrow>
    </math>
    `;

    const result = new Mathml2asciimath(mathml).convert();

    expect(result).toBe(`\\ \\ \\ \\ t o d o s \\ o s \\ v a l o r e s \\ e m \\ m ó d u l o !`);
  });
});
