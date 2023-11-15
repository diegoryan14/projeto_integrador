const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="primeiro-retangulo"> 
        <div style="display:block">
            <div class="h4-sel-carga">
                <h2 class="test">SELECIONAR CARGA</h2>
            </div>
            <div id="segundo-retangulo">
                <div class="teste">
                <div class="row">
                        <div class="col-lg-12 control-section">
                            <div>
                                <ejs-grid :dataSource="data" >
                                    <e-columns>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='EMPRESAORIGEM' headerText='Empresa Origem' width='30px' textAlign='Left'></e-column>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='EMPRESADESTINO' headerText='Empresa Destino' width='30px'></e-column>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='PESOCARGA' headerText='Peso' width='20' textAlign='Left'></e-column>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='DATARETIRADA' headerText='Data Retirada' width='20' format="yMd" textAlign='Left'></e-column>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='DATAENTREGA' headerText='Data Entrega' width='20' format="yMd" textAlign='Left'></e-column>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='PRECOVIAGEM' headerText='Preço' format='C2' width='20'></e-column>
                                        <e-column clipMode='EllipsisWithTooltip' class='th-table' field='OBSERVACOES' headerText='Observações' width='20'></e-column>
                                    </e-columns>
                                </ejs-grid>
                            </div>
                        </div>
                    </div>
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
            data:[]
        }
    },
    methods: {
    },
    mounted(){
    }
})

