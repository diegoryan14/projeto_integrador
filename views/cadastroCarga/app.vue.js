const AppTemplate = `

<div class="container control-section">
    <div class="row titulo" style="width: 100%; height: 100%">
        <div class="col-md-12">
            <div class="card-body" style="margin-top: 1em">
                <div class="h4-sel-carga">
                    <h4 class="test">POSTAR CARGA</h4>
                </div>
                <div class="row">
                    <div class="col-md-6 margin-input" style="margin-top: 6px;">
                        <ejs-dropdownlist
                            floatLabelType="Auto"
                            :dataSource='EmpresaDestino'
                            v-model="input.EMPRESA_DESTINO"
							:fields="{ text: 'NOME', value: 'SEQ'}"
                            ref="NOMEEMPRESADESTINO"
                            cssClass="e-outline"
                            maxlength="60"
                            placeholder="Nome Empresa Destino">
                        </ejs-dropdownlist>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            v-model="input.PESO"
                            ref="PESO"
                            cssClass="e-outline"
                            maxlength="60"
                            placeholder="Peso Kg">
                        </ejs-numerictextbox>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            v-model="input.LARGURA"
                            ref="LARGURA"
                            cssClass="e-outline"
                            placeholder="Largura"
                            maxlength="60">
                        </ejs-numerictextbox>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            v-model="input.ALTURA"
                            ref="ALTURA"
                            cssClass="e-outline"
                            placeholder="Altura"
                            maxlength="60">
                        </ejs-numerictextbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            v-model="input.PRECO"
                            ref="PRECO"
                            cssClass="e-outline"
                            placeholder="Valor da viagem"
                            maxlength="10">
                        </ejs-numerictextbox>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-dropdownlist
                            :dataSource='EstadoInicial'
                            v-model="input.ESTADO_INICIAL"
							:fields="{ text: 'NOME', value: 'SEQ'}"
                            floatLabelType="Auto"
                            ref="estadoInicial"
                            cssClass="e-outline"
                            placeholder='Estado Origem'>
                        </ejs-dropdownlist>
                    </div>
                    <div class="col-md-3 margin-input" style="margin-top: 6px;">
                        <ejs-dropdownlist
                            :dataSource='CidadeFinal'
                            v-model="input.CIDADE_INICIAL"
							:fields="{ text: 'NOME', value: 'SEQ'}"
                            floatLabelType="Auto"
                            ref="cidadeInicial"
                            cssClass="e-outline"
                            placeholder='Cidade Origem'>
                        </ejs-dropdownlist>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-dropdownlist
                            :dataSource='EstadoInicial'
                            v-model="input.ESTADO_FINAL"
							:fields="{ text: 'NOME', value: 'SEQ'}"
                            floatLabelType="Auto"
                            ref="estadoFinal"
                            cssClass="e-outline"
                            placeholder='Estado Destino'>
                        </ejs-dropdownlist>
                    </div>
                    <div class="col-md-3 margin-input" style="margin-top: 6px;">
                        <ejs-dropdownlist
                            :dataSource='CidadeFinal'
                            v-model="input.CIDADE_FINAL"
							:fields="{ text: 'NOME', value: 'SEQ'}"
                            floatLabelType="Auto"
                            ref="cidadeFinal"
                            cssClass="e-outline"
                            placeholder='Cidade Destino'>
                        </ejs-dropdownlist>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 margin-input" style="margin-top: 6px;">
                        <ejs-datepicker 
                            floatLabelType="Auto"
                            v-model="input.DATA_ENTREGA"
                            cssClass="e-outline"
                            placeholder="Data para Entrega">
                        </ejs-datepicker>
                    </div>
                    <div class="col-md-3 margin-input" style="margin-top: 6px;">
                        <ejs-datepicker 
                            floatLabelType="Auto"
                            v-model="input.DATA_RETIRADA"
                            cssClass="e-outline"
                            placeholder="Data para Retirada">
                        </ejs-datepicker>
                    </div>
                    <div class="col-md-6 margin-input" style="margin-top: 6px;">
                        <ejs-textbox
                            floatLabelType="Auto"
                            v-model="input.DESCRICAO"
                            cssClass="e-outline"
                            ref="DESCRICAO"
                            maxlength="300"
                            placeholder="Descrição">
                        </ejs-textbox>
                    </div>
                </div>
                <div class="button">
                    <button type="button" @click="cadastrarCarga" class="btn btn-outline-primary btn-carga">Postar Carga</button>
                </div>
            </div>
        </div>
    </div>
</div>

`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            gridDataSource: [],
            loadTime: null,
            loadingIndicator: { indicatorType: 'Shimmer' },
            fields: { text: 'text', value: 'value' },
            input: {
                EMPRESA_DESTINO: null, /* dropdown */
                PESO: null,
                ALTURA: null,
                LARGURA: null,
                PRECO: null,
                ESTADO_INICIAL: null, /* dropdown */
                CIDADE_INICIAL: null, /* dropdown */
                ESTADO_FINAL: null, /* dropdown */
                CIDADE_FINAL: null, /* dropdown */
                DATA_ENTREGA: null, /* DIA Q O CAMINHONEIRO TEM Q ENTREGAR A CARGA PARA A EMPRESA_DESTINO */
                DATA_RETIRADA: null, /* DIA Q O  CAMINHONEIRO DEVE PEGAR A CARGA NA EMPRESA Q CADASTROU */
                DESCRICAO: null,
                PRODUTO: null
            },
            EmpresaDestino: [],
            EstadoInicial: [],
            CidadeInicial: [],
            EstadoFinal: [],
            CidadeFinal: []
        }
    },
    methods: {
        load: function() {
            let proxy = this;
            this.$refs.overviewgrid.$el.ej2_instances[0].on('data-ready', function () {
                proxy.dReady =  true;
             })
            this.$refs.overviewgrid.$el.addEventListener('DOMSubtreeModified', function () {
                if (proxy.dReady && proxy.stTime && proxy.isDataChanged) {
                    let e = performance.now() - proxy.stTime;
                    proxy.loadTime = "Load Time: <b>" + e.toFixed(0) + "</b><b>ms</b>";
                    proxy.stTime = null;
                    proxy.dReady = false;
                    proxy.isDataChanged = false;
                    proxy.$refs.msgelement.classList.remove('e-hide');
                }
            })
        },
        get_empresa(){
            axios.post(BASE + "/cadastroCarga/get_empresa").then((res) => {
                this.EmpresaDestino = res.data;
            })
        },
        get_estado(){
            axios.post(BASE + "/cadastroCarga/get_estado").then((res) => {
                this.EstadoInicial = res.data;
                this.EstadoFinal = res.data;
            })
        },
        get_cidade(){
            axios.post(BASE + "/cadastroCarga/get_cidade").then((res) => {
                this.CidadeInicial = res.data;
                this.CidadeFinal = res.data;
            })
        },
        cadastrarCarga(){
            if(this.input.EMPRESA_DESTINO == 0){
                alert('Por Favor, Insira a Empresa Destino.');
                return;
            }
            if(this.input.PESO == null){
                alert('Por Favor, Insira o Peso.');
                return;
            }
            if(this.input.ALTURA == null){
                alert('Por Favor, Insira a Altura.');
                return;
            }
            if(this.input.LARGURA == null){
                alert('Por Favor, Insira a Largura da Carga.');
                return;
            }
            if(this.input.PRECO == null){
                alert('Por Favor, Insira a Preço da Carga.');
                return;
            }
            if(this.input.ESTADO_INICIAL == 0){
                alert('Por Favor, Insira o Estado de Partida da Carga.');
                return;
            }
            if(this.input.CIDADE_INICIAL == 0){
                alert('Por Favor, Insira a Cidade de Partida da Carga.');
                return;
            }
            if(this.input.ESTADO_FINAL == 0){
                alert('Por Favor, Insira o Estado de Destino da Carga.');
                return;
            }
            if(this.input.CIDADE_FINAL == 0){
                alert('Por Favor, Insira a Cidade de Destino da Carga.');
                return;
            }
            // if(this.input.PRODUTO == null){
            //     alert('Por Favor, Insira o Produto.');
            //     return;
            // }

            var obj = {
                'EMPRESA_DESTINO': this.input.EMPRESA_DESTINO,
                'PESO': this.input.PESO,
                'ALTURA': this.input.ALTURA,
                'LARGURA': this.input.LARGURA,
                'PRECO': this.input.PRECO,
                'ESTADO_INICIAL': this.input.ESTADO_INICIAL,
                'CIDADE_INICIAL': this.input.CIDADE_INICIAL,
                'ESTADO_FINAL': this.input.ESTADO_FINAL,
                'CIDADE_FINAL': this.input.CIDADE_FINAL,
                // 'DATA_RETIRADA': this.input.DATA_RETIRADA,
                // 'DATA_ENTREGA': this.input.DATA_ENTREGA,
                'DESCRICAO': this.input.DESCRICAO,
                // 'PRODUTO': this.input.PRODUTO
            }
            axios.post(BASE + "/cadastroCarga/cadastrarCarga",obj).then((res) => {
                if(res.data.code == "0"){
                    alert(res.data.msg);
                    return;
                }
                alert(res.data.msg);
                this.limparCamposCarga();
            })
        },
        limparCamposCarga(){
            this.input.EMPRESA_DESTINO = null;
            this.input.PESO = null;
            this.input.ALTURA = null;
            this.input.LARGURA = null;
            this.input.PRECO = null;
            this.input.ESTADO_INICIAL = null;
            this.input.CIDADE_INICIAL = null;
            this.input.ESTADO_FINAL = null;
            this.input.CIDADE_FINAL = null;
            this.input.DATA_RETIRADA = null;
            this.input.DATA_SAIDA = null;
            this.input.DESCRICAO = null;
            this.input.PRODUTO = null;
        }        
    },
    mounted(){
        this.get_empresa();
        this.get_cidade();
        this.get_estado();
    }
})