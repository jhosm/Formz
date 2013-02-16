var xsd_simpleElement = '<?xml version="1.0"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ui="http://www.jhosm.com/XMLSchema-UI">' +
'	<xs:element name="person" type="xs:string" ui:label="Pessoa" ui:placeholder="Nome da Pessoa">' +
'		<xs:annotation>' +
'	  	<xs:documentation>Humano</xs:documentation>' +
'	  </xs:annotation>' +
'	</xs:element>' +
'</xs:schema>';

var xsd_simpleElement_minimalData = '<?xml version="1.0"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
'	<xs:element name="person" type="xs:string"/>' +
'</xs:schema>';

