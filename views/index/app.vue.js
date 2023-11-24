const AppTemplate = `
<div class="container control-section">
    <div class="row titulo" style="width: 100%; height: 100%">
        <div class="col-md-12">
            <div class="card-body" style="margin-top: 1em">
                <div class="h4-sel-carga">
                    <h4 class="test">Cargas Disponiveis</h4>
                </div>
                <div>
                    <ejs-grid
                        ref="gridCargas"
                        style="width: 300px"
                        :toolbar='["Search"]'
                        :dataSource="grid_Cargas"
                        :allowPaging="true"
                        :allowSorting='true'
                        :pageSettings='{ pageSizes: true, pageSize: 5 }'>
                        <e-columns>
                            <e-column field='EMP_CADASTROU' headerText='Empresa Cadastrou' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='LOCAL_PARTIDA' headerText='Endereço Empresa' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='DATA_SAIDA' headerText='Data Saída' clipMode='EllipsisWithTooltip' width=120></e-column>
                            <e-column field='DATA_ENTREGA' headerText='Data Entrega' clipMode='EllipsisWithTooltip' width=120></e-column>
                            <e-column field='EMP_DESTINO' headerText='Empresa Destino' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='LOCAL_DESTINO' headerText='Endereço Destino' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='NOME' headerText='Nome da Carga' clipMode='EllipsisWithTooltip' width=110></e-column>
                            <e-column field='CONTEUDO_CARGA' headerText='Produto' clipMode='EllipsisWithTooltip' width=100></e-column>
                            <e-column field='DESCRICAO' headerText='Descrição' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='PRECO' headerText='Preço(R$)' clipMode='EllipsisWithTooltip' width=100></e-column>
                            <e-column field='ALTURA' headerText='Altura(m)' clipMode='EllipsisWithTooltip' width=100></e-column>
                            <e-column field='LARGURA' headerText='Largura(m)' clipMode='EllipsisWithTooltip' width=100></e-column>
                            <e-column field='PESO' headerText='Peso(Kg)' clipMode='EllipsisWithTooltip' width=100></e-column>
							<e-column headerText='Ações' :template='templateButtons' width='100'></e-column>
                        </e-columns>
                    </ejs-grid>
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
            grid_Cargas: [],
            templateButtons: function () {
				return {
					template: Vue.component('templateButtons', {
						template: `
							<div>
								<div class="icons text-center">
									<ejs-tooltip
										style="cursor: pointer;"
                                        v-if="data.CARGA_ACEITA == 'N'"
										content="Solicitar Carga"
										position='center'>
										<span style="font-weight: bold" @click="solicitarCarga(data)"><i class="fas fa-share-square"></i></span>
									</ejs-tooltip>
                                    <ejs-tooltip
										style="cursor: pointer;"
										content="Dados da Empresa"
										position='center'>
										<span style="font-weight: bold" @click="abrirModal(data)"><i class="fas fa-info-circle"></i></span>
									</ejs-tooltip>
								</div>
                                <ejs-dialog
                                    isModal='true'
                                    :buttons="modalButtons"
                                    ref="modalEmpresa"
                                    :open="(args) => {args.preventFocus = true;}"
                                    v-bind:visible="false"
                                    :animationSettings="{ effect: 'Zoom' }"
                                    :showCloseIcon='false'
                                    :closeOnEscape='false'
                                    zIndex="1001"
                                    target="body"
                                    style="margin: 10px"
                                    width="1000px">
                                    <div class="row">
                                        <div class="row-input" style="margin: 0px;">
                                            <div class="col col-md-12">
                                                <h4 class="text-center" style="font-weight: bold;">Dados da Empresa</h4>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </ejs-dialog> 
							</div>
							`,
						data: function () { 
							return {
								data: {},
                                modalButtons: null
							}; 
						},
						methods: {
                            solicitarCarga(args){
                                axios.post(BASE + "/index/solicitarCarga",args).then((res) => {
                                    if(res.data.code == 0){
                                        alert(res.data.msg);
                                        return;
                                    }
                                    alert(res.data.msg);
                                    return;
                                })
                            },
                            abrirModal(){
                                this.$refs.modalEmpresa.show();
								this.modalButtons = [{click: this.fecharModal, buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}}];
                            },
                            fecharModal(){
                                this.$refs.modalEmpresa.hide();
                            }
						}
					})
				}
			}
        }
    },
    methods: {
        get_cargas(){
            axios.post(BASE + "/index/get_cargas").then((res) => {
                this.grid_Cargas = res.data;
            })
        },
    },
    mounted(){
        this.get_cargas();
    }
})



/* 
    EXEMPLO DO MODAL
<ejs-dialog
    isModal='true'
    :buttons="modalButtonsPdf"
    ref="modalPdf"
    :open="(args) => {args.preventFocus = true;}"
    v-bind:visible="false"
    :animationSettings="{ effect: 'Zoom' }"
    :showCloseIcon='false'
    :closeOnEscape='false'
    zIndex="1001"
    target="body"
    style="margin: 10px"
    width="1000px">
    <div class="row">
        <div class="row-input" style="margin: 0px;">
            <div class="col col-md-12">
                <h4 class="text-center" style="font-weight: bold;">{{input.NOME_PDF}}</h4>
            </div>
            <div></div>
        </div>
    </div>
</ejs-dialog> 
*/