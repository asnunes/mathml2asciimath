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
