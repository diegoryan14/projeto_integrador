const AppTemplate = `
<div class="container control-section">
    <div class="row titulo" style="width: 100%; height: 100%">
        <div class="col-md-12">
            <div class="card-body" style="margin-top: 1em">
                <div class="h4-sel-carga">
                    <h4 class="test">Minhas Cargas Cadastradas</h4>
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
                            <e-column field='DATA_SAIDA' :format='formatoptions1' headerText='Data Saída' clipMode='EllipsisWithTooltip' width=120></e-column>
                            <e-column field='DATA_ENTREGA' :format='formatoptions2' headerText='Data Entrega' clipMode='EllipsisWithTooltip' width=120></e-column>
                            <e-column field='EMP_DESTINO' headerText='Empresa Destino' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='LOCAL_DESTINO' headerText='Endereço Destino' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='DESCRICAO' headerText='Descrição' clipMode='EllipsisWithTooltip' width=150></e-column>
                            <e-column field='PRECO' headerText='Preço(R$)' clipMode='EllipsisWithTooltip' width=110></e-column>
                            <e-column field='ALTURA' headerText='Altura(m)' clipMode='EllipsisWithTooltip' width=110></e-column>
                            <e-column field='LARGURA' headerText='Largura(m)' clipMode='EllipsisWithTooltip' width=110></e-column>
                            <e-column field='PESO' headerText='Peso(Kg)' clipMode='EllipsisWithTooltip' width=110></e-column>
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
            formatoptions1: { type: 'dateTime', format: 'dd/MM/y' },
            formatoptions2: { type: 'dateTime', format: 'dd/MM/y' },
            templateButtons: function () {
				return {
					template: Vue.component('templateButtons', {
						template: `
							<div>
								<div class="icons text-center">
									<ejs-tooltip
										style="cursor: pointer;"
                                        v-if="data.EXISTE_PEDIDO > 0"
										content="Aceitar Carga"
										position='center'>
										<span style="font-weight: bold" @click="aceitarCarga(data)"><i class="fas fa-edit"></i></span>
									</ejs-tooltip>
								</div>
							</div>
							`,
						data: function () { 
							return {
								data: {}
							}; 
						},
						methods: {
                            aceitarCarga(args){
                                axios.post(BASE + "/index_empresa/aceitarCarga",args).then((res) => {
                                    if(res.data.code == 0){
                                        alert(res.data.msg);
                                        return;
                                    }
                                    alert(res.data.msg);
                                    return;
                                })
                            }
						}
					})
				}
			}
        }
    },
    methods: {
        get_cargas(){
            axios.post(BASE + "/index_empresa/get_cargas").then((res) => {
                res.data.forEach(e => {
                    if(e.DATA_SAIDA != null){
                        e.DATA_SAIDA = new Date(e.DATA_SAIDA);
                    }
                    if(e.DATA_ENTREGA != null){
                        e.DATA_ENTREGA = new Date(e.DATA_ENTREGA);
                    }
                });
                this.grid_Cargas = res.data;
            })
        },
    },
    mounted(){
        this.get_cargas();
    }
})