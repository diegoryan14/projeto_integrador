const AppTemplate = `

<div class="container control-section">
    <div class="row titulo" style="width: 100%; height: 100%">
        <div class="col-md-12">
            <div class="card-body" style="margin-top: 1em">
                <div class="h4-sel-carga">
                    <h4 class="test">Postar Carga</h4>
                </div>
                <div class="row">
                    <div class="col-md-5 margin-input" style="margin-top: 6px;">
                        <ejs-textbox 
                            floatLabelType="Auto"
                            ref="NOMEEMPRESAORIGEM"
                            cssClass="e-outline"
                            maxlength="60"
                            placeholder="Nome Empresa Origem">
                        </ejs-textbox>
                    </div>
                    <div class="col-md-5 margin-input" style="margin-top: 6px;">
                        <ejs-textbox
                            floatLabelType="Auto"
                            ref="NOMEEMPRESADESTINO"
                            cssClass="e-outline"
                            maxlength="60"
                            placeholder="Nome Empresa Destino">
                        </ejs-textbox>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            ref="PESO"
                            cssClass="e-outline"
                            maxlength="60"
                            placeholder="Peso Kg">
                        </ejs-numerictextbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            ref="LARGURA"
                            cssClass="e-outline"
                            placeholder="Largura"
                            maxlength="60">
                        </ejs-numerictextbox>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            ref="ALTURA"
                            cssClass="e-outline"
                            placeholder="Altura"
                            maxlength="60">
                        </ejs-numerictextbox>
                    </div>
                    <div class="col-md-2 margin-input" style="margin-top: 6px;">
                        <ejs-numerictextbox
                            floatLabelType="Auto"
                            ref="PRECO"
                            cssClass="e-outline"
                            placeholder="Valor da viagem"
                            maxlength="60">
                        </ejs-numerictextbox>
                    </div>
                    <div class="col-md-6 margin-input" style="margin-top: 6px;">
                        <ejs-textbox
                            floatLabelType="Auto"
                            ref="DESCRICAO"
                            cssClass="e-outline"
                            maxlength="60"
                            placeholder="Descrição">
                        </ejs-textbox>
                    </div>
                </div>
                <div class="button">
                    <button type="button" class="btn btn-outline-primary btn-carga">Postar Carga</button>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="card-body">
                <div class="h4-sel-carga">
                    <h4 class="test">Cargas Disponíveis para entrega</h4>
                </div>
                <div class="content-wrapper">
                    <ejs-grid ref='overviewgrid' id='overviewgrid' :dataSource="gridDataSource" :allowSelection='true' :allowSorting='true'
                        height='350' rowHeight=38 :enableHover='false' :enableHeaderFocus='true' :load='load' :loadingIndicator='loadingIndicator'>
                        <e-columns>
                            <e-column clipMode='EllipsisWithTooltip' field='EMPRESA' headerText='Empresa' :isPrimaryKey='true' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='DATABUSCAR' headerText='Data para buscar' :isPrimaryKey='true' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='ORIGEM' headerText='Origem' width='20px' clipMode='EllipsisWithTooltip'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='DESTINO' headerText='Destino' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='PESOCARGA' headerText='Peso' width='20px' clipMode='EllipsisWithTooltip'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='TIPOCAMINHAO' headerText='Tipo de Caminhão' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='LARGURACONTAINER' headerText='Largura Carreta' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='ALTURACONTAINER' headerText='Altura Carreta' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='DESCRICAO' headerText='Descrição' width='20px'></e-column>
                            <e-column clipMode='EllipsisWithTooltip' field='PRECOVIAGEM' headerText='Preço da Viagem' width='20px' textAlign='Right'></e-column>
                        </e-columns>
                    </ejs-grid>
                </div>
                <div class="button">
                    <button type="button" class="btn btn-outline-primary btn-carga">Visualizar Carga</button>
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
        }
    },
    mounted(){
    }
})