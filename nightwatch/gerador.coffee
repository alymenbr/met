esperaCarregar = (campo, locator, callback) ->
  console.log 'Esperando aparecer o campo *' + campo + '*'
  driver.wait ->
    driver.findElements(locator).then (object)->
      if object.length is 0
        console.log 'Campo *'+campo+'* não encontrado!'
      else
        console.log 'Campo *'+campo+'* encontrado!'
        callback()
      true unless object.length is 0
  ,60000

selecionaOpcaoDeComboBox = (name, value) -> 
  locatorCombo = webdriver.By.name(name)
  locatorOpcao = webdriver.By.css("[value='" + value + "']")
  esperaCarregar name, locatorCombo, ->
    driver.findElement(locatorCombo).click()
    esperaCarregar name, locatorOpcao, ->
      driver.findElement(locatorOpcao).click()

selecionaOpcao = (name, value) -> 
  locator = webdriver.By.css("input[name='" + name + "'][value='" + value + "']")
  esperaCarregar name, locator, ->
    driver.findElement(locator).click()

clicaEm = (campo, callback) ->
  esperaCarregar campo, webdriver.By.name(campo), ->
    driver.findElement(webdriver.By.name(campo)).click()
    callback?()

clicaEmLinkLike = (locator) ->
  driver.findElement(locator).click()

preencheCampo = (campo, conteudo) ->
  esperaCarregar campo, webdriver.By.name(campo), ->
    driver.findElement(webdriver.By.name(campo)).sendKeys(conteudo)

preencheTomadorDeServico = (nota_fiscal, callback) ->
  esperaCarregar 'CNPJ', webdriver.By.name('form:numDocumento'), ->
    #Preenche Tomador de Serviço
    console.log 'Preenchendo Tomador de Serviço para ' + nota_fiscal.razao_social
    selecionaOpcao 'form:tipoPessoa', '2'
    preencheCampo 'form:dnomeRazaoSocial', nota_fiscal.razao_social
    preencheCampo 'form:cep', nota_fiscal.cep
    preencheCampo 'form:logradouro', nota_fiscal.logradouro
    preencheCampo 'form:numero', nota_fiscal.logradouro_numero
    preencheCampo 'form:bairro', nota_fiscal.bairro
    preencheCampo 'form:numDocumento', nota_fiscal.cnpj_cliente
    console.log 'Preenchendo Tomador de Serviço -> Pronto!'
    console.log 'Preenchendo Formulário de Município -> Pronto!'
    
    clicaEm 'form:j_id171'
    esperaCarregar 'Cidade', webdriver.By.name('ConsultaMunicipioModalPanelSubview:formPanel:nomeMunicipioModalPanel'), ->
      preencheCampo 'ConsultaMunicipioModalPanelSubview:formPanel:nomeMunicipioModalPanel', nota_fiscal.cidade
      preencheCampo 'ConsultaMunicipioModalPanelSubview:formPanel:estadoMunicipio', nota_fiscal.estado      
      clicaEm 'ConsultaMunicipioModalPanelSubview:formPanel:bt_consultar_municipio_tomador'
      esperaCarregar 'Link ' + nota_fiscal.cidade,  webdriver.By.xpath("//tr[contains(@class, 'dr-table-firstrow')]/descendant::td/descendant::a"), ->
        console.log 'Carregou!'
        clicaEmLinkLike webdriver.By.xpath("//tr[contains(@class, 'dr-table-firstrow')]/descendant::td/descendant::a")
        callback?(nota_fiscal)

preencheIdentificacaoDoServico = (nota_fiscal, callback) ->
  clicaEmLinkLike webdriver.By.xpath("//div[@id='topo_aba2']/descendant::a")
  esperaCarregar 'Serviço', webdriver.By.name('form:descriminacaoServico'), ->
    preencheCampo 'form:descriminacaoServico', nota_fiscal.servico
    preencheCampo 'form:descriminacaoServico', nota_fiscal.mes
    preencheCampo 'form:descriminacaoServico', "/"
    preencheCampo 'form:descriminacaoServico', nota_fiscal.ano
    preencheCampo 'form:descriminacaoServico', "\n"
    preencheCampo 'form:descriminacaoServico', nota_fiscal.textoPedido
    preencheCampo 'form:descriminacaoServico', nota_fiscal.pagamento
    preencheCampo 'form:descriminacaoServico', nota_fiscal.vencimento
    preencheCampo 'form:descriminacaoServico', nota_fiscal.conta    
    selecionaOpcaoDeComboBox 'form:codigoCnae', nota_fiscal.codigo_cnae
    #selecionaOpcaoDeComboBox 'form:itemListaServico', nota_fiscal.subcodigo_cnae
    callback?()

preencheValoresFinais = (nota_fiscal) ->
  clicaEmLinkLike webdriver.By.xpath("//div[@id='topo_aba3']/descendant::a")
  preencheCampo 'form:valorServicos', nota_fiscal.valor
  clicaEm 'form:bt_emitir_NFS-e'
  esperaCarregar 'Botão Final', webdriver.By.name('appletAssinador:j_id707'), ->
    clicaEm 'appletAssinador:j_id707'

emite = (nota_fiscal, callback) ->
  console.log 'Emitindo Nota Fiscal #emite#'
  clicaEm 'geracao', ->
    clicaEm 'MesReferenciaModalPanelSubview:formMesReferencia:j_id171'
    clicaEm 'MesReferenciaModalPanelSubview:formMesReferencia:bt_confirmar_comp_subs'
    console.log 'Emitindo Nota Fiscal #emite# -> Pronto!'
    callback?()

preparaEmissao = (nota_fiscal, callback) ->
  console.log 'Preparando emissão #preparaEmissao#'
  console.log 'Emitindo arquivo ' + nota_fiscal 
  path_completo = __dirname + "/nota_emissao/" + nota_fiscal
  fs.readFile path_completo, "utf8", (err, data) ->
    if err
      console.log "Erro ao emitir NFE: " + err
      return
    console.log 'Preparando emissão #preparaEmissao# -> Pronto!'
    console.log data
    info_nota = eval(data)
    callback info_nota

faz_login = ->

  #Acessa o site da prefeitura de BH
  driver.get "https://bhissdigital.pbh.gov.br/nfse/pages/security/login.jsf"

  #Realiza o login
  preencheCampo 'username', '18801297000150'
  preencheCampo 'password', '18801297'
  clicaEm 'envia'
  

emiteNota = (nota_fiscal) ->
  preparaEmissao nota_fiscal, (nota_fiscal) ->
    emite nota_fiscal, ->
      preencheTomadorDeServico nota_fiscal, ->
        preencheIdentificacaoDoServico nota_fiscal, ->
          preencheValoresFinais nota_fiscal

#Inicialização do browser
webdriver = require("selenium-webdriver")
driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
## driver.manage().timeouts().implicitlyWait(60 * 1000)
## driver.manage().timeouts().pageLoadTimeout(60 * 1000)

fs = require("fs")
file = __dirname + "/nota_emissao/"

#Abre o navegador e loga no site da prefeitura
faz_login().then ->
 #Obtém as notas a emitir e as emite
  nota_emissao = fs.readdirSync(file)
  emiteNota nota_fiscal for nota_fiscal in nota_emissao 