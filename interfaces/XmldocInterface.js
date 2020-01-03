import xmldoc from 'xmldoc';

export class XmldocInterface {
    constructor(html) {
        this.xmlDocument = xmldoc.XmlDocument(html);
    }

    parse() {
        return this.getMathTags().map(el => this.parseElement(el));
    }

    parseElement(element) {
        return {
            name: element.name,
            attr: element.attr,
            value: element.value,
            children: _hasNoChild(element) ? [] : element.children.map(el => this.parseElement(el))
        };
    }

    getMathTags() {
        return this.xmlDocument.childNamed('math');
    }
}

const _hasNoChild = el => el.children.length === 0;