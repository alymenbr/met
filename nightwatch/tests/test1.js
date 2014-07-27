var timeout = 200000;
var waitFor = 1500;

var DoWith = function(newBrowser) {
    this.browser = newBrowser;
};

DoWith.prototype.vaiPara = function(url) {
    console.log('vaiPara:' + url);
    this.browser
        .url(url)
        .waitForElementVisible('body', timeout);
    return this;
};

DoWith.prototype.esperaPor = function(nome) {
    console.log('esperaPor:' + nome);
    selector = '[name=\'' + nome + '\']';

    this.browser
        .pause(waitFor)
        .waitForElementVisible(selector, timeout);
    return this;
};

DoWith.prototype.clicaEm = function(nome) {
    console.log('clicaEm:' + nome);
    selector = '[name=\'' + nome + '\']';

    this.browser
        .waitForElementVisible(selector, timeout)
        .click(selector);
    return this;
};

DoWith.prototype.executaScript = function(script) {
    console.log('executaScript:' + script);

    this.browser
        .execute(script, []);
    return this;
};

DoWith.prototype.xPathClicaEm = function(nome) {
    console.log('xPathClicaEm:' + nome);
    selector = '[name=\'' + nome + '\']';

    this.browser.useXpath()
        .waitForElementVisible(selector, timeout)
        .click(selector);
    return this;
};

DoWith.prototype.preencheCampo = function(nome, valor) {
    console.log('preencheCampo:' + nome + ' ' + valor);
    selector = '[name=\'' + nome + '\']';

    this.browser
        .waitForElementVisible(selector, timeout)
        .setValue(selector, valor);
    return this;
};

DoWith.prototype.selecionaOpcao = function(nome, valor) {
    console.log('selecionaOpcao:' + nome + ' ' + valor);
    selector = '[name=\'' + nome + '\'][value=\'' + valor + '\']';

    this.browser
        .waitForElementVisible(selector, timeout)
        .click(selector);

    return this;
};

DoWith.prototype.selecionaOpcaoDeComboBox = function(nome, valor) {
    console.log('selecionaOpcaoDeComboBox:' + nome + ' ' + valor);
    selectorCombo = '[name=\'' + nome + '\']';
    selectorOpcao = '[value=\'' + valor + '\']';

    this.browser
        .waitForElementVisible(selectorCombo, timeout)
        .click(selectorCombo)
        .waitForElementVisible(selectorOpcao, timeout)
        .click(selectorOpcao);
    return this;
};



// *********
// NAVEGACAO
// *********
DoWith.prototype.fazLogin = function() {
    this
        .vaiPara("https://bhissdigital.pbh.gov.br/nfse/pages/security/login.jsf")
        .preencheCampo('username', '18801297000150')
        .preencheCampo('password', '18801297')
        .clicaEm('envia');

    return this;
};

DoWith.prototype.emiteNota = function(nota) {
    this
        .preencheNovaNota()
        .preencheTomadorDeServico(nota)
        .preencheIdentificacaoDoServico(nota)
        .preencheValoresFinais(nota);

    return this;
};

DoWith.prototype.preencheNovaNota = function() {
    this
        .clicaEm('geracao')
        .clicaEm('MesReferenciaModalPanelSubview:formMesReferencia:j_id171')
        .clicaEm('MesReferenciaModalPanelSubview:formMesReferencia:bt_confirmar_comp_subs');

    return this;
};

DoWith.prototype.preencheTomadorDeServico = function(nota_fiscal) {
    this
        .selecionaOpcao('form:tipoPessoa', '2')
        .esperaPor('form:dnomeRazaoSocial')
        .preencheCampo('form:dnomeRazaoSocial', nota_fiscal.razao_social)
        .preencheCampo('form:cep', nota_fiscal.cep)
        .preencheCampo('form:logradouro', nota_fiscal.logradouro)
        .preencheCampo('form:numero', nota_fiscal.logradouro_numero)
        .preencheCampo('form:bairro', nota_fiscal.bairro)
        .preencheCampo('form:numDocumento', nota_fiscal.cnpj_cliente)
        .clicaEm('form:j_id171')
        .esperaPor('ConsultaMunicipioModalPanelSubview:formPanel:nomeMunicipioModalPanel')
        .preencheCampo('ConsultaMunicipioModalPanelSubview:formPanel:nomeMunicipioModalPanel', nota_fiscal.cidade)
        .preencheCampo('ConsultaMunicipioModalPanelSubview:formPanel:estadoMunicipio', nota_fiscal.estado)
        .clicaEm('ConsultaMunicipioModalPanelSubview:formPanel:bt_consultar_municipio_tomador')
        .clicaEm('ConsultaMunicipioModalPanelSubview:formPanel:listaMunicipios:0:j_id589');

    return this;
};

DoWith.prototype.preencheIdentificacaoDoServico = function(nota_fiscal) {

    this
        .executaScript("controlaAbas('aba2');")
        .esperaPor('form:descriminacaoServico')
        .preencheCampo('form:descriminacaoServico', nota_fiscal.servico)
        .preencheCampo('form:descriminacaoServico', nota_fiscal.mes)
        .preencheCampo('form:descriminacaoServico', "/")
        .preencheCampo('form:descriminacaoServico', nota_fiscal.ano)
        .preencheCampo('form:descriminacaoServico', "\n")
        .preencheCampo('form:descriminacaoServico', nota_fiscal.textoPedido)
        .preencheCampo('form:descriminacaoServico', nota_fiscal.pagamento)
        .preencheCampo('form:descriminacaoServico', nota_fiscal.vencimento)
        .preencheCampo('form:descriminacaoServico', nota_fiscal.conta)
        .selecionaOpcaoDeComboBox('form:codigoCnae', nota_fiscal.codigo_cnae);

    return this;
};

DoWith.prototype.preencheValoresFinais = function(nota_fiscal) {

    this
        .executaScript("controlaAbas('aba3');")
        .preencheCampo('form:valorServicos', nota_fiscal.valor)
        .clicaEm('form:bt_emitir_NFS-e');

    return this;
};


// *********
// RUN TESTS
// *********
module.exports = {

    "Test Case 1 - Navigate to Google": function(browser) {

        var loadFile = require('../loadFile');
        var nota = loadFile();

        new DoWith(browser)
            .fazLogin()
            .emiteNota(nota);
    }
};