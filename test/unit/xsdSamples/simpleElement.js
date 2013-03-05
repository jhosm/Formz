var xsd_simpleElement = '<?xml version="1.0"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ui="http://formz.com/UI">' +
'	<xs:element name="person" type="xs:string" >' +
'		<xs:annotation>' +
'			<xs:appinfo>' +
'				<ui:info label="Pessoa" placeholder="Nome da Pessoa"/>' +
'			</xs:appinfo>' +
'	  	<xs:documentation>Humano</xs:documentation>' +
'	  </xs:annotation>' +
'	</xs:element>' +
'</xs:schema>';


var xsd_simpleElement_targetNamespace = '<?xml version="1.0"?>' +
'<xs:schema targetNamespace="http://formz.com/ANamespace" xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
'		<xs:element name="person" type="xs:string" />' +
'</xs:schema>';

var xsd_simpleElement_minimalData = '<?xml version="1.0"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
'	<xs:element name="person" type="xs:string"/>' +
'</xs:schema>';

var xsd_simpleElement_complexType_oneAttribute = '<?xml version="1.0"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ui="http://formz.com/UI">' +
'	<xs:element name="person" type="personType"/>' +
'	<xs:complexType name="personType">' +
'		<xs:annotation>' +
'			<xs:appinfo>' +
'				<ui:info label="Pessoa"/>' +
'			</xs:appinfo>' +
'	  	<xs:documentation>Humano</xs:documentation>' +
'	  </xs:annotation>' +
'		<xs:attribute name="name" type="xs:string">' +
'			<xs:annotation>' +
'			<xs:appinfo>' +
'				<ui:info label="Nome" placeholder="Nome da Pessoa" />' +
'			</xs:appinfo>' +
'	  		<xs:documentation>Indicar nome da pessoa</xs:documentation>' +
'	  	</xs:annotation>' +
'		</xs:attribute>' +
'	</xs:complexType>' +
'</xs:schema>';