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

var xsd_simpleElement_complexType_twoAttributes = '<?xml version="1.0"?>' +
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
'		<xs:attribute name="genre" type="xs:string">' +
'			<xs:annotation>' +
'			<xs:appinfo>' +
'				<ui:info label="Género" placeholder="Género da Pessoa" />' +
'			</xs:appinfo>' +
'	  		<xs:documentation>Indicar género da pessoa</xs:documentation>' +
'	  	</xs:annotation>' +
'		</xs:attribute>' +
'	</xs:complexType>' +
'</xs:schema>';

var xsd_simpleElement_complexType_complexContent_extension = '<?xml version="1.0"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ui="http://formz.com/UI">' +
'	<xs:element name="person" type="personType"/>' +
'	<xs:complexType name="personType">' +
'		<xs:annotation>' +
'			<xs:appinfo>' +
'				<ui:info label="Pessoa"/>' +
'			</xs:appinfo>' +
'	  	<xs:documentation>Humano</xs:documentation>' +
'	  </xs:annotation>' +
'		<xs:complexContent>' +
'			<xs:extension base="primateType">' +
'				<xs:attribute name="name" type="xs:string">' +
'					<xs:annotation>' +
'						<xs:appinfo>' +
'							<ui:info label="Nome" placeholder="Nome da Pessoa" />' +
'						</xs:appinfo>' +
'			  		<xs:documentation>Indicar nome da pessoa</xs:documentation>' +
'			  	</xs:annotation>' +
'				</xs:attribute>' +
'				<xs:attribute name="genre" type="xs:string">' +
'					<xs:annotation>' +
'						<xs:appinfo>' +
'							<ui:info label="Género" placeholder="Género da Pessoa" />' +
'						</xs:appinfo>' +
'	  				<xs:documentation>Indicar género da pessoa</xs:documentation>' +
'	  			</xs:annotation>' +
'				</xs:attribute>' +
'			</xs:extension>' +
'		</xs:complexContent>' +
'	</xs:complexType>' +
'	<xs:complexType name="primateType">' +
'		<xs:attribute name="furColor" type="xs:string">' +
'			<xs:annotation>' +
'				<xs:appinfo>' +
'					<ui:info label="Cor Pêlo" placeholder="Castanho, preto..." />' +
'				</xs:appinfo>' +
'		 		<xs:documentation>Indicar cor do pêlo.</xs:documentation>' +
'		 	</xs:annotation>' +
'		</xs:attribute>' +
'  </xs:complexType>' +
'</xs:schema>';