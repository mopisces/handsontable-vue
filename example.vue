<template>
	<div  class="table">
			<hot-table  :settings="hotSettings" licenseKey="non-commercial-and-evaluation" ref="testHot" :root="root"></hot-table>
      <button type="button" @click="exportCsv()">导出文件（CSV格式）</button>
	</div>
</template>
<script>
	import { HotTable } from '@handsontable/vue';//引入handsontable组件
	import 'handsontable/languages/zh-CN';//引入语言类型
	import 'Handsontable' from 'handsontable';
	export default {
		data() {
			return {
				root: 'test-hot',
				data:[
						{
							id: 0,
							flag: 'EUR',
							currencyCode: 'EUR',
							currency: 'Euro',
							level: 0.9033,
							units: 'EUR / USD',
							asOf: '08/19/2019',
							onedChng: 0.0026,
							data:'07/11/2019',
							stars:5,
							range:6,
							phone:'huawei'
						},
						//...
					],
				dataArray:[
					[22,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.00121, 0.0012,'PHP','PHP','Philippine Peso'],
					//...
				],//数组型data，可以插入行
				hotSettings :{
					language: "zh-CN",//设置语言（需要引入）
					data:Handsontable.helper.createSpreadsheetData(100, 18),//可以使用组件自带函数填充值
					columns:[
			            {
			            	editor: 'select',//编辑方式
      						selectOptions: ['Kia', 'Nissan', 'Toyota', 'Honda']//可选值
			            },//可以是空对象
			            {
			            	data: 'flag',
			            	renderer: (instance, td, row, col, prop, value, cellProperties)=>{
			                //渲染列的方法
			            		td.innerHTML = value;
			           		},//自定义渲染（自带html渲染）renderer:"html"
			                compareFunctionFactory: function compareFunctionFactory() {
			              		return function comparator() {
			              			return 0; //第一列不排序
			              		}
			              	},
							readOnly:true	//列只读
			            },
			            {
							data: 'currencyCode',
							type: 'text',
							type: 'dropdown',			//下拉选项
							source: ['yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white']//可选值
			            },
			            {
			            	data: 'currency',
			            	type: 'text',
			            	validator:my.currencyValidator,
			            	source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
							allowInvalid: true,			//是否允许非法值,默认允许
							strict: true
			            },
			            {
							data: 'level',
							type: 'numeric',
							numericFormat: {
								pattern: '0.0000'
							},
							validator:'my.levelValidator',
							numericFormat: {
								pattern: '0,0.0000$',//格式
								culture: 'zh-CN'	//钱的标识
							},
							allowEmpty: false
			            },
			            {
							data: 'units',
							type: 'handsontable',	//嵌套handsontable
							handsontable: {			//嵌套handsontable配置
								colHeaders: ['Marque', 'Country', 'Parent company'],
								autoColumnSize: true,
								data:[
									{name: 'BMW', country: 'Germany', owner: 'Bayerische Motoren Werke AG'},
									{name: 'Chrysler', country: 'USA', owner: 'Chrysler Group LLC'},
									{name: 'Nissan', country: 'Japan', owner: 'Nissan Motor Company Ltd'},
									{name: 'Suzuki', country: 'Japan', owner: 'Suzuki Motor Corporation'},
									{name: 'Toyota', country: 'Japan', owner: 'Toyota Motor Corporation'},
									{name: 'Volvo', country: 'Sweden', owner: 'Zhejiang Geely Holding Group'}
								],
								getValue:function(){		//显示选择的值
									var selection = this.getSelectedLast();
									return this.getSourceDataAtRow(selection[0]).name;
								}
							}
							//type: 'password',//密码类型
							//editor: false	//不允许编辑（cell没有加readOnly的css）
							
			            },
			            {
							data: 'asOf',
							type: 'date',
							dateFormat: 'MM/DD/YYYY'
			            },
			            {
							data: 'onedChng',
							type: 'numeric',
							numericFormat: {
								pattern: '0.00%'
							}
			            }
					],//列的定义（对象类型,无法插入新的列）
					colWidths: 100,//列宽度
					width: '100%',// ()=>{return 500;} / 500  表宽度
					height: 320,//()=>{return 500;} / '100%'  表高度
					rowHeights: 23,//行高度
					rowHeaders: true,//行头部（使用组件自带）
					colHeaders: true//列头部（使用组件自带）
					/*colHeaders:[
								'ID',
							    'Country',
							    'Code',
							    'Currency',
							    'Level',
							    'Units',
							    'Date',
							    'Change',
							    'Phone',
							    'Drinks',
							    'JPDN',
							    'Pepsi',
							    'DyDo'
							],*///列头部自定义
					fixedRowsTop:2,			//固定头部2行
					fixedRowsBottom:2,		//固定底部2行
					fixedColumnsLeft:2,		//固定左侧2列
					manualColumnResize:true,//多列的调整（宽度）
					manualRowResize: true,	//行调整（如果有设定值,高度不小于）
					manualColumnMove: true,	//多列的拖动
					manualRowMove: true,	//多行拖动
					headerTooltips:true,	//鼠标划过头部时的提示文字
					stretchH:'all',			//所有列宽小于表宽时,填充满整个表 all（所有列填充）/last（最后一列）/none(不填充)
					contextMenu: true,		//右键菜单（使用默认）
					/*contextMenu:[
						//自定义右键菜单，可选值：https://handsontable.com/docs/7.1.0/demo-dropdown-menu.html
					],*/
          			manualColumnFreeze:true,//使用右键菜单固定列
          			hiddenRows:{
          				rows: [3, 5, 9],	//隐藏的行index
          				indicators: true	//是否显示隐藏标识
          			},						//隐藏行（contextMenu可以使用右键菜单隐藏行）
          			hiddenColumns:{
          				columns: [3, 5, 9],	//隐藏的列index
          				indicators: true	//是否显示隐藏标标识
          			},						//隐藏列（contextMenu可以使用右键菜单隐藏列）
          			trimRows: [1, 2, 5],	//除去指定的行
          			bindRowsWithHeaders: 'strict',//绑定行头部（在行移动时行头不变）
          			nestedHeaders:[
          				['A', {label: 'B', colspan: 8}, 'C'],
          				['D', {label: 'E', colspan: 4}, {label: 'F', colspan: 4}, 'G'],
          				['H', {label: 'I', colspan: 2}, {label: 'J', colspan: 2}, {label: 'K', colspan: 2}, {label: 'L', colspan: 2}, 'M'],
          				['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
          			],						//多列头部合并
          			collapsibleColumns:[
          				{row: -4, col: 1, collapsible: true},//row的第一行时表的第一行，不表头，往上是负数
          				{row: -3, col: 1, collapsible: true},
          				{row: -2, col: 1, collapsible: true},
          				{row: -2, col: 3, collapsible: true}
          			],						//多列合并头部显示合并展开按钮
          			dropdownMenu:true,		//表头部列的下拉菜单
          			/*dropdownMenu:[
          				//自定义下拉菜单，可选值：https://handsontable.com/docs/7.1.0/demo-dropdown-menu.html
          			],*/
          			columnSorting: true,		//是否开启列的排序
          			/*columnSorting:{
          										//自定义列排序配置
          				sortEmptyCells:true,	//空的cell是否排序
          				initialConfig:{			//初始化的排序配置
          					column:2,			//排序的列的index
          					sortOrder:'asc'		//排序方式 asc/desc
          				}
          			},*/
          			//multiColumnSorting:true,	//是否开启多列排序，不可与columnSorting同时开启（按下）
          			/*multiColumnSorting:{
          										//自定义多列排序配置
						sortEmptyCells:true,	//空的cell是否排序
						initialConfig:[			//初始化的排序配置
							{
								column: 0,		//排序的列的index
								sortOrder: 'asc'//排序方式 asc/desc
							},
							...
						]
          			},*/
          			search: true,		//是否开启搜索 demo : https://handsontable.com/docs/7.1.0/demo-searching.html
          			filters: true,		//是否开启过滤 在下拉菜单中
          			/*columnSummary:[
						//列合计
						{
							sourceColumn: 2,		//统计的列
							destinationRow: 4,		//显示结果的目标行			
							destinationColumn: 1,	//显示结果的目标列	
							reversedRowCoords: true,//显示的cell坐标固定在底部
							type: 'min',			//统计方式max/min/count(合计不为空的值)/average/custom
							forceNumeric: true,		//是否开启严格的数字模式
							customFunction:function(endpoint){
								//type为custom时，自定义统计方式 endpoint是对象
							},
							suppressDataTypeErrors: false,	//统计不为数字的cell时，丢出错误
							roundFloat:2 					//保留小数点
					    },
					    ...
					],*/
					readOnly:true,	//开启只读
					fillHandle:true,//填充数据
					/*fillHandle:{
						//自定义填充数据
						direction: 'vertical',	//填充方向 true/false/horizontal/vertical
						autoInsertRow: true		//拉到底部时自动插入行
					},*/
					mergeCells:[
						{row: 1, col: 1, rowspan: 3, colspan: 3},
						{row: 3, col: 4, rowspan: 2, colspan: 2},
						{row: 5, col: 6, rowspan: 3, colspan: 3,className:"htLeft htBottom"}
					],							//合并cell
					className: "htCenter",		/*cell中文字对齐方式
													Horizontal:htLeft, htCenter, htRight, htJustify
													Vertical: htTop, htMiddle, htBottom*/
					
					customBorders:true,//设置边框
					/*customBorders:[
										//自定义边框
						{
							range:{		//定义连续的边框 
								from:{row: 1,col: 1},
								to:{row: 3,col:4}
							},
							top:{
								width:2,
								color:'#5292F7'
							},
							left:{
								width: 2,
								color: 'orange'
							},
							bottom:{
								width: 2,
								color:'red'
							},
							right:{
								width: 2,
								color: 'magenta'
							}
						},
						{		//定义单独cell的边框
							row: 2,
							col: 2,
							left:{
								width: 2,
								color: 'red'
							},
							right:{
								width: 1,
								color: 'green'
							}
						}
					],*/
					comments: true,//cell注释(和cell一起使用)
					cell:[
						{row: 1, col: 1, comment: {value: 'Some comment'}},//第2行第2列的cell添加注释
						{row: 2, col: 2, comment: {value: 'More comments'}}
					],					
					currentRowClassName:'currentRow',//当前行的className
					currentColClassName: 'currentCol',//当前列的className
					copyPaste:true,//开启复制
					/*copyPaste:{
						columnsLimit: 25,//一次允许复制的最大列数
						rowsLimit: 50,//一次允许复制的最大行数
						pasteMode: 'shift_down',
					}//自定义复制插件*/

					/*可以在配置中添加钩子*/
					/**
					 * [ NestedRows 插件添加子到嵌套表格后触发]
					 * @param  {[object]} parent  [父对象]
					 * @param  {[object|undefine]} element [被添加的子对象]
					 * @param  {[object|undefine]} index   [被添加的子对象在父对象内部的索引]
					 */
					afterAddChild:(parent,element,index)=>{},
					/**
					 * [编辑被打开渲染后触发]
					 * @param  {[type]} row    [被编辑cell的行索引]
					 * @param  {[type]} column [被编辑cell的列索引]
					 */
					afterBeginEditing:(row,column)=>{},
					/**
					 * [新配置updateSettings()或者初始化后触发]
					 */
					afterCellMetaReset:()=>{},
					/**
					 * [修改数据时触发]
					 * @param  {[array]} changes [包含被修改cell的二维数组]
					 * @param  {[string]} source [触发的源,详细见https://handsontable.com/docs/7.1.0/tutorial-using-callbacks.html?_ga=2.134914929.1685050319.1562552020-1754995230.1562372214#page-source-definition]
					 */
					afterChange:(changes,source)=>{},
					/**
					 * [可见列移动后被触发(manualColumnMove设置为true)]
					 * @param  {[array]} columns  [列被移动前的索引]
					 * @param  {[number]} target  [列被移动后的索引]
					 */
					afterColumnMove:(columns,target)=>{},
					/**
					 * [列的宽度拉伸后触发(manualColumnResize设置为true)]
					 * @param  {[number]}  currentColumn [被修改的改的列索引]
					 * @param  {[number]}  newSize       [新的列宽]
					 * @param  {Boolean}   isDoubleClick [双击的标识]
					 */
					afterColumnResize:(currentColumn,newSize,isDoubleClick)=>{},
					/**
					 * [列排序后触发( ColumnSorting 或者 MultiColumnSorting都能触发)]
					 * @param  {[type]} currentSortConfig      [description]
					 * @param  {[type]} destinationSortConfigs [description]
					 */
					afterColumnSort:(currentSortConfig,destinationSortConfigs)=>{},
					/**
					 * [右键菜单弹出或者设置右键菜单触发]
					 * @param  {[array]} predefinedItems [包含提前定义的右键菜单对象的数组]
					 */
					afterContextMenuDefaultOptions:(predefinedItems)=>{},
					/**
					 * [右键菜单隐藏后触发]
					 * @param  {[object]} context [Context Menu插件的实例]
					 */
					afterContextMenuHide:(context)=>{},
					/**
					 * [右键菜单显示后触发]
					 * @param  {[object]} context [Context Menu插件的实例]
					 */
					afterContextMenuShow:(context)=>{},
					/**
					 * [表中数据被复制后触发]
					 * @param  {[array]} data   	[被复制的值( array(array) )]
					 * @param  {[array]} coords 	[被复制的区域坐标(array(object)) 包含起始坐标和结束坐标]
					 */
					afterCopy:(data,coords)=>{},
					/**
					 * [复制超过限制后触发]
					 * @param  {[number]} selectedRows     [选择的行数]
					 * @param  {[number]} selectedColumns  [选择的列数]
					 * @param  {[number]} copyRowsLimit    [复制行的限制数]
					 * @param  {[number]} copyColumnsLimit [复制列的限制数]
					 */
					afterCopyLimit:(selectedRows,selectedColumns,copyRowsLimit,copyColumnsLimit)=>{},
					/**
					 * [创建新列后触发]
					 * @param  {[number]} index  [新插入的第一列的索引]
					 * @param  {[number]} amount [新创建的列数]
					 * @param  {[string]} source [触发的源]
					 */
					afterCreateCol:(index,amount,source)=>{},
					/**
					 * [创建新行后触发]
					 * @param  {[type]} index  [新插入的第一行的索引]
					 * @param  {[type]} amount [新创建的行数]
					 * @param  {[type]} source [触发的源]
					 */
					afterCreateRow:(index,amount,source)=>{},
					/**
					 * [表中数据被剪切后触发]
					 * @param  {[type]} data   [被剪切的值( array(array) )]
					 * @param  {[type]} coords [被剪切的区域坐标(array(object)) 包含起始坐标和结束坐标]
					 */
					afterCut:(data,coords)=>{},
					/**
					 * [当前单元格不被选中后触发]
					 */
					afterDeselect:()=>{},
					/**
					 * [在销毁handsontable实例时触发]
					 */
					afterDestroy:()=>{},
					/**
					 * [使用NestedRow时,分离一个嵌套行后触发]
					 * @param  {[object]} parent  [被分离对象的父对象]
					 * @param  {[object]} element [被分离的对象]
					 */
					afterDetachChild:(parent,element)=>{}
					/**
					 * [keydown 后被触发]
					 * @param  {[Event]} Event [原生的keydown事件]
					 */
					afterDocumentKeyDown:(Event)=>{},
					/**
					 * [下拉菜单被设置后触发]
					 * @param  {[type]} predefinedItems [提前设置的下拉菜单]
					 */
					afterDropdownMenuDefaultOptions:(predefinedItems)=>{},
					/**
					 * [下拉菜单隐藏后触发]
					 * @param  {[DropdownMenu]} instance [下拉菜单的实例]
					 */
					afterDropdownMenuHide:(instance)=>{},
					/**
					 * [下拉菜单显示后触发]
					 * @param  {[DropdownMenu]} dropdownMenu [下拉菜单的实例]
					 */
					afterDropdownMenuShow:(dropdownMenu)=>{},
					/**
					 * [在应用过滤插件后触发]
					 * @param  {[array]} conditionsStack [包含已添加的条件对象的数组]
					 */
					afterFilter:(conditionsStack)=>{},
					/**
					 * [获取单元格设置后触发]
					 * @param  {[number]} row            [行索引]
					 * @param  {[number]} column         [列索引]
					 * @param  {[object]} cellProperties [cell properties]
					 */
					afterGetCellMeta:(row,column,cellProperties)=>{},
					/**
					 * [Fired after retrieving information about a column header and appending it to the table header]
					 * @param  {[number]} column 			[列的索引]
					 * @param  {[HTMLTableCellElement]} TH  [头部cell对象]
					 */
					afterGetColHeader:(column,TH)=>{},
					/**
					 * [获取列头部渲染器后触发]
					 * @param  {[array]} renderers [包含渲染方法的数组]
					 */
					afterGetColumnHeaderRenderers:(renderers)=>{},
					/**
					 * [获得行头部后触发]
					 * @param  {[number]} row [行索引]
					 * @param  {[HTMLTableCellElement]} TH  [头部的TH对象]
					 */
					afterGetRowHeader:(row,TH)=>{},
					/**
					 * [获取行头部渲染器后触发]
					 * @param  {[array]} renderers [包含渲染方法的数组]
					 */
					afterGetRowHeaderRenderers:(renderers)=>{},
					/**
					 * [隐藏列后触发(hiddenColumns插件开启)]
					 * @param  {[array]} currentHideConfig     [包含开始被隐藏的实际列数组]
					 * @param  {[array]} destinationHideConfig [包含结尾被隐藏的实际列数组]
					 * @param  {[boolean]} actionPossible        [提供的列索引是否有效]
					 * @param  {[boolean]} stateChanged          [是否影响未被隐藏的列]
					 */
					afterHideColumns:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{},
					/**
					 * [隐藏行后触发(hiddenRows插件开启)]
					 * @param  {[array]} currentHideConfig     [包含开始被隐藏的实际行数组]
					 * @param  {[array]} destinationHideConfig [包含结尾被隐藏的实际行数组]
					 * @param  {[boolean]} actionPossible        [提供的行索引是否有效]
					 * @param  {[boolean]} stateChanged          [是否影响未被隐藏的行]
					 */
					afterHideRows:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{},
					/**
					 * [handsontable实例被初始化后触发]
					 */
					afterInit:()=>{},
					/**
					 * [description]
					 * @param  {[string]} languageCode [新语言代码]
					 */
					afterLanguageChange:(languageCode)=>{},
					/**
					 * [the table was switched into listening mode]
					 */
					afterListen:()=>{},
					/**
					 * [加载数据( loadData()或者updataSettings() )后触发]
					 * @param  {[boolean]} initialLoad [data在初始化时是否被加载]
					 */
					afterLoadData:(initialLoad)=>{},
					/**
					 * [合并cell后触发]
					 * @param  {[CellRange]} 	cellRange  			[被选中的cell]
					 * @param  {[objetc]}	 	mergeParent 		[parent collection of the provided cell range]
					 * @param  {[boolean]} 		auto(default false) [是否自动被插件唤醒]
					 */
					afterMergeCells:(cellRange,mergeParent,auto)=>{},
					/**
					 * [Fired after the end of the selection is being modified]
					 * @param  {[CellCoords]} coords      [Visual coords of the freshly selected cell.]
					 * @param  {[number]} rowTransformDir [-1 if trying to select a cell with a negative row index. 0 otherwise]
					 * @param  {[number]} colTransformDir [-1 if trying to select a cell with a negative column index. 0 otherwise]
					 */
					afterModifyTransformEnd:(coords,rowTransformDir,colTransformDir)=>{},
					/**
					 * [Fired after the start of the selection is being modified ]
					 * @param  {[CellCoords]} coords      [Visual coords of the freshly selected cell.]
					 * @param  {[number]} rowTransformDir [-1 if trying to select a cell with a negative row index. 0 otherwise]
					 * @param  {[number]} colTransformDir [-1 if trying to select a cell with a negative column index. 0 otherwise]
					 */
					afterModifyTransformStart:(coords,rowTransformDir,colTransformDir)=>{},
					/**
					 * [移动端滑动后触发]
					 */
					afterMomentumScroll:()=>{},
					/**
					 * [右键点击列或者行头部时触发]
					 * @param  {[Event]} event  	 	   [右键菜单事件]
					 * @param  {[CellCoords]} coords 	   [cell坐标对象,包含行/列的索引]
					 * @param  {[HTMLTableCellElement]} TD [cell的TD或TH对象]
					 */
					afterOnCellContextMenu:(event,coords,TD)=>{},
					/**
					 * [cell角被双击后触发]
					 * @param  {[Event]} event [dblclick 事件对象]
					 */
					afterOnCellCornerDblClick:(event)=>{},
					/**
					 * [cell角鼠标按下后触发]
					 * @param  {[Event]} event [mousedown 事件对象]
					 */
					afterOnCellCornerMouseDown:(event)=>{},
					/**
					 * [cell鼠标按下后触发]
					 * @param  {[Event]} event  			[ousedown 事件对象]
					 * @param  {[CellCoords]} coords 		[cell坐标对象,包含行/列的索引]
					 * @param  {[HTMLTableCellElement]} TD 	[cell的TD或TH对象]
					 */
					afterOnCellMouseDown:(event,coords,TD)=>{},
					/**
					 * [光标离开行或者列头部后触发]
					 * @param  {[Event]} event  			[mouseout 事件对象]
					 * @param  {[CellCoords]} coords 		[离开的cell坐标对象,包含行/列的索引]
					 * @param  {[HTMLTableCellElement]} TD 	[cell的TD或TH对象]
					 */
					afterOnCellMouseOut:(event,coords,TD)=>{},
					/**
					 * [光标划过cell后触发]
					 * @param  {[Event]} event  			[mouseover 事件对象]
					 * @param  {[CellCoords]} coords 		[cell坐标对象,包含行/列的索引]
					 * @param  {[HTMLTableCellElement]} TD  [cell的TD或TH对象]
					 */
					afterOnCellMouseOver:(event,coords,TD)=>{},
					/**
					 * [鼠标点击cell后触发]
					 * @param  {[Event]} event  			[mouseup 事件对象]
					 * @param  {[CellCoords]} coords 		[cell坐标对象,包含行/列的索引]
					 * @param  {[HTMLTableCellElement]} TD  [cell的TD或TH对象]
					 */
					afterOnCellMouseUp:(event,coords,TD)=>{},
					/**
					 * [复制到表格后触发]
					 * @param  {[array]} data   [复制的值]
					 * @param  {[array]} coords [复制的目标区域坐标]
					 */
					afterPaste:(data,coords)=>{},
					/**
					 * [所有插件初始化后触发]
					 */
					afterPluginsInitialized:()=>{},
					/**
					 * [恢复以后触发]
					 * @param  {[object]} action [包含data,index,actionType]
					 */
					afterRedo:(action)=>{},
					/**
					 * [在窗口大小变化后触发]
					 * @param  {[object]} previousDimensions [调整之前容器的大小]
					 * @param  {[object]} currentDimensions  [调整之后容器的大小]
					 * @param  {[boolean]} stateChanged      [容器是否被调节大小]
					 */
					afterRefreshDimensions:(previousDimensions,currentDimensions,stateChanged)=>{},
					/**
					 * [cell删除后触发]
					 * @param  {[number]} row    [被移除cell的行索引]
					 * @param  {[number]} column [被移除cell的列索引]
					 * @param  {[string]} key    [被移除cell的key值]
					 * @param  {[*]} 	  value  [已删除的cell的值]
					 */
					afterRemoveCellMeta:(row,column,key,value)=>{},
					/**
					 * [一列或者多列移除后触发]
					 * @param  {[number]} index           [起始列的可视索引]
					 * @param  {[number]} amount          [删除列的数量]
					 * @param  {[array]}  physicalColumns [被删除列的数据组成的数组]
					 * @param  {[string]} source          [触发的源]
					 */
					afterRemoveCol:(index,amount,physicalColumns,source)=>{},
					/**
					 * [一行或者多行移除后触发]
					 * @param  {[number]} index        [起始行的可视索引]
					 * @param  {[number]} amount       [删除行的数量]
					 * @param  {[array]}  physicalRows [被删除行的数据组成的数组]
					 * @param  {[string]} source       [触发的源]
					 */
					afterRemoveRow:(index,amount,physicalRows,source)=>{},
					/**
					 * [handsontable被渲染后触发]
					 * @param  {boolean} isForced [渲染被更改配置或数据触发时为true,被滑动或选择触发时为false]
					 */
					afterRender:(isForced)=>{},
					/**
					 * [结束渲染cell后触发(在render结束后触发)]
					 * @param  {[HTMLTableCellElement]} TD      [当前已渲染的cell的TD element]
					 * @param  {[number]} 		 row            [行索引]
					 * @param  {[number]} 		 column         [列索引]
					 * @param  {[string|number]} prop           [列的property值,如果数据是数组,返回列的索引]
					 * @param  {[*]}			 value          [被渲染cell的值]
					 * @param  {[object]} 		 cellProperties [包含列propties的对象]
					 */
					afterRenderer:(TD,row,column,prop,value,cellProperties)=>{},
					/**
					 * [多行被移动后触发]
					 * @param  {[array]} rows    [包含被移动行索引的数组]
					 * @param  {[number]} target [行移动的目标索引]
					 */
					afterRowMove:(rows,target)=>{},
					/**
					 * [行高度被调整后触发]
					 * @param  {[number]}  currentRow    [被调整行的索引]
					 * @param  {[number]}  newSize       [计算新的行高度]
					 * @param  {Boolean} isDoubleClick   [记录是否是双击的标志]
					 */
					afterRowResize:(currentRow,newSize,isDoubleClick)=>{},
					/**
					 * [水平移动滚动条事件后触发]
					 */
					afterScrollHorizontally:()=>{},
					/**
					 * [垂直移动滚动条事件后触发]
					 */
					afterScrollVertically:()=>{},
					/**
					 * [一个或多个cell被选中后触发(每选中一个触发一次)]
					 * @param  {[number]} row              [开始cell的行索引]
					 * @param  {[number]} column           [开始cell的列索引]
					 * @param  {[number]} row2             [结束cell的行索引]
					 * @param  {[number]} column2          [结束cell的列索引]
					 * @param  {[object]} preventScrolling [Object with value property where its value change will be observed]
					 * @param  {[number]} selectionLayerLevel [被选中的层级]
					 */
					afterSelection:(row,column,row2,column2,preventScrolling,selectionLayerLevel)=>{
						preventScrolling.value = true;//选中后是否防止滚动
					},
					/**
					 * [一个或多个cell被选中后触发]
					 * @param  {[number]} row              [开始行的索引]
					 * @param  {[string]} prop             [开始数据的property name]
					 * @param  {[number]} row2             [结束行的索引]
					 * @param  {[string]} prop2            [结束数据的property name]
					 * @param  {[object]} preventScrolling [Object with value property where its value change will be observed]
					 * @param  {[number]} selectionLayerLevel [被选中的层级]
					 */
					afterSelectionByProp:(row,prop,row2,prop2,preventScrolling,selectionLayerLevel)=>{
						preventScrolling.value = true;//选中后是否防止滚动
					},
					/**
					 * [一个或多个cell被选中结束后触发(多个cell选中只触发一次)]
					 * @param  {[number]} row                 [开始cell的行索引]
					 * @param  {[number]} column              [开始cell的列索引]
					 * @param  {[number]} row2                [结束cell的行索引]
					 * @param  {[number]} column2             [结束cell的列索引]
					 * @param  {[number]} selectionLayerLevel [被选中的层级]
					 */
					afterSelectionEnd:(row,column,row2,column2,selectionLayerLevel)=>{},
					/**
					 * [一个或多个cell被选中结束后触发(多个cell选中只触发一次)]
					 * @param  {[number]} row                 [开始cell的行索引]
					 * @param  {[string]} prop                [开始cell的property name]
					 * @param  {[number]} row2                [结束cell的行索引]
					 * @param  {[string]} prop2               [结束cell的property name]
					 * @param  {[number]} selectionLayerLevel [被选中的层级]
					 */
					afterSelectionEndByProp:(row,prop,row2,prop2,selectionLayerLevel)=>{},
					/**
					 * [cell meta 被修改后触发]
					 * @param  {[number]} row    [行索引]
					 * @param  {[number]} column [列索引]
					 * @param  {[string]} key    [更新的meta键]
					 * @param  {[*]} value       [更新的meta值]
					 */
					afterSetCellMeta:(row,column,key,value)=>{},
					/**
					 * [cell数据被改变后触发]
					 * @param  {[array]} changes [包含改变之前和之后值的数组]
					 * @param  {[string]} source [触的发源]
					 */
					afterSetDataAtCell:(changes,source)=>{},
					/**
					 * [cell数据被改变后触发]
					 * @param  {[array]}  changes [包含改变值的数组  [[row, prop, oldValue, value], ...]  ]
					 * @param  {[string]} source  [触的发源]
					 */
					afterSetDataAtRowProp:(changes,source)=>{},
					/**
					 * [修剪指定行后触发]
					 * @param  {[array]} currentTrimConfig     [包含开始修剪行index的数组]
					 * @param  {[array]} destinationTrimConfig [包含结束修剪行index的数组]
					 * @param  {[boolean]} actionPossible      [是否绑定到table上]
					 * @param  {[boolean]} stateChanged        [是否影响所有被修剪行]
					 * @return {[undfined|boolean]}            [返回false时修剪方法不会被执行]
					 */
					afterTrimRow:(currentTrimConfig,destinationTrimConfig,actionPossible,stateChanged)=>{},
					/**
					 * [撤销后触发]
					 * @param  {[object]} action [包含data,index,actionType]
					 */
					afterUndo:(action)=>{},
					/**
					 * [显示隐藏列后触发]
					 * @param  {[array]}   currentHideConfig     [包含显示的列索引的数组]
					 * @param  {[array]}   destinationHideConfig [包含隐藏的列索引的数组]
					 * @param  {[boolean]} actionPossible        [列的索引是否有效]
					 * @param  {[boolean]} stateChanged          [改方法是否影响隐藏的列]
					 */
					afterUnhideColumns:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{},
					/**
					 * [显示隐藏行后触发]
					 * @param  {[array]}   currentHideConfig     [包含显示的行索引的数组]
					 * @param  {[array]}   destinationHideConfig [包含隐藏的行索引的数组]
					 * @param  {[boolean]} actionPossible        [行的索引是否有效]
					 * @param  {[boolean]} stateChanged          [改方法是否影响隐藏的行]
					 */
					afterUnhideRows:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{},
					/**
					 * [表关闭listening mode后触发]
					 */
					afterUnlisten:()=>{},
					/**
					 * [不合并cell后触发]
					 * @param  {[type]}    cellRange 		   [description]
					 * @param  {[boolean]} auto(defalut false) [是否自动被插件执行]
					 */
					afterUnmergeCells:(cellRange,auto)=>{},
					/**
					 * [trimRow插件的unTrimRow方法触发]
					 * @param  {[array]}   currentTrimConfig     [包含未修剪行索引的数组]
					 * @param  {[array]}   destinationTrimConfig [包含修剪行索引的数组]
					 * @param  {[boolean]} actionPossible        [是否所有行索引绑定到table]
					 * @param  {[boolean]} stateChanged          [是否影响所有修剪行]
					 * @return {[undefine|boolean]}              [返回false,unTrimRow方法不会被执行]
					 */
					afterUntrimRow:(currentTrimConfig,destinationTrimConfig,actionPossible,stateChanged)=>{},
					/**
					 * [更新table配置后触发]
					 * @param  {[object]} newSettings [新的配置对象]
					 */
					afterUpdateSettings:(newSettings)=>{},
					/**
					 * [validator 方法被定义执行后触发]
					 * @param  {Boolean} isValid [是否有效的]
					 * @param  {[*]}             value   [The value in question.]
					 * @param  {[number]}        row     [行索引]
					 * @param  {[string|number]} prop    [propty名称或者列的索引]
					 * @param  {[string]}        source  [触发的源]
					 * @return {[undefine|boolean]} [返回false,validator 方法不会被执行]
					 */
					afterValidate:(isValid,value,row,prop,source)=>{},
					/**
					 * [viewportColumnCalculatorOverride 方法内部触发]
					 * @param  {[object]} calc [行的计算器]
					 */
					afterViewportColumnCalculatorOverride:(calc)=>{},
					/**
					 * [viewportRowCalculatorOverride 方法内部触发]
					 * @param  {[object]} calc [行的计算器]
					 */
					afterViewportRowCalculatorOverride:(calc)=>{},



					beforeAddChild:(parent,element,index)=>{},
					beforeAutofill:(start,end,data)=>{},
					beforeAutofillInsidePopulate:(index,direction,input,deltas)=>{},
					beforeCellAlignment:(stateBefore,range,type,alignmentClass)=>{},
					beforeChange:(changes,source)=>{},
					beforeChangeRender:(changes,source)=>{},
					beforeColumnMove:(columns,target)=>{},
					beforeColumnResize:(currentColumn,newSize,isDoubleClick)=>{},
					beforeColumnSort:(currentSortConfig,destinationSortConfigs)=>{},
					beforeContextMenuSetItems:(menuItems)=>{},
					beforeContextMenuShow:(context)=>{},
					beforeCopy:(data,coords)=>{},
					beforeCreateCol:(index,amount,source)=>{},
					beforeCreateRow:(index,amount,source)=>{},
					beforeCut:(data,coords)=>{},
					beforeDetachChild:(parent,element)=>{},
					beforeDrawBorders:(corners,borderClassName)=>{},
					beforeDropdownMenuSetItems:(menuItems)=>{},
					beforeDropdownMenuShow:(dropdownMenu)=>{},
					beforeFilter:(conditionsStack)=>{},
					beforeGetCellMeta:(row,column,cellProperties)=>{},
					beforeHideColumns:(currentHideConfig,destinationHideConfig,actionPossible)=>{},
					beforeHideRows:(currentHideConfig,destinationHideConfig,actionPossible)=>{},
					beforeInit:()=>{},
					beforeInitWalkontable:(walkontableConfig)=>{},
					beforeKeyDown:(event)=>{},
					beforeLanguageChange:(languageCode)=>{},
					beforeMergeCells:(cellRange,auto)=>{},
					beforeOnCellContextMenu:(event,coords,TD)=>{},
					beforeOnCellMouseDown:(event,coords,TD,controller)=>{},
					beforeOnCellMouseOut:(event,coords,TD)=>{},
					beforeOnCellMouseOver:(event,coords,TD,controller)=>{},
					beforeOnCellMouseUp:(event,coords,TD,controller)=>{},
					beforePaste:(data,coords)=>{},
					beforeRedo:(action)=>{},
					beforeRefreshDimensions:(previousDimensions,currentDimensions,actionPossible)=>{},
					beforeRemoveCellClassNames:()=>{},
					beforeRemoveCellMeta:(row,column,key,value)=>{},
					beforeRemoveCol:(index,amount,physicalColumns,source)=>{},
					beforeRemoveRow:(index,amount,physicalRows,source)=>{},
					beforeRender:(isForced)=>{},
					beforeRenderer:(TD,row,column,prop,value,cellProperties)=>{},
					beforeRowMove:(rows,target)=>{},
					beforeRowResize:(currentRow,newSize,isDoubleClick)=>{},
					beforeSetRangeEnd:(coords)=>{},
					beforeSetRangeStart:(coords)=>{},
					beforeSetRangeStartOnly:(coords)=>{},
					beforeStretchingColumnWidth:(stretchedWidth,column)=>{},
					beforeTouchScroll:()=>{},
					beforeTrimRow:(currentTrimConfig,destinationTrimConfig,actionPossible)=>{},
					beforeUndo:(action)=>{},
					beforeUnhideColumns:(currentHideConfig,destinationHideConfig,actionPossible)=>{},
					beforeUnhideRows:(currentHideConfig,destinationHideConfig,actionPossible)=>{},
					beforeUnmergeCells:(cellRange,auto)=>{},
					beforeUntrimRow:(currentTrimConfig,destinationTrimConfig,actionPossible)=>{},
					beforeValidate:(value,row,prop,source)=>{},
					beforeValueRender:(value,cellProperties)=>{},

					/**
					 * [handsontable实例被创建后触发]
					 */
					construct:()=>{},
					/**
					 * [HiddenColumns插件触发(无论是否有隐藏的列)]
					 * @param  {[type]} column [description]
					 */
					hiddenColumn:(column)=>{},
					/**
					 * [修改数据行后触发]
					 * @param  {[number]} row [行索引]
					 */
					hiddenRow:(row)=>{},
					/**
					 * [handsontable实例初始化时触发,在渲染之前]
					 */
					init:()=>{},
					/**
					 * [description]
					 * @param  {[type]} startArea  [description]
					 * @param  {[type]} entireArea [description]
					 * @return {[type]}            [description]
					 */
					modifyAutofillRange:(startArea,entireArea)=>{},
					/**
					 * [修改数据列后触发]
					 * @param  {[type]} column [修改数据列的索引]
					 */
					modifyCol:(column)=>{},
					/**
					 * [修改列头部后触发]
					 * @param  {[number]} column [列的索引]
					 */
					modifyColHeader:(column)=>{},
					/**
					 * [修改列头部宽度时触发]
					 */
					modifyColumnHeaderHeight:()=>{},
					/**
					 * [修改列宽度后触发]
					 * @param  {[number]} width  [修改后宽度]
					 * @param  {[number]} column [列的索引]
					 */
					modifyColWidth:(width,column)=>{},
					/**
					 * [Fired to allow modifying the copyable range with a callback function]
					 * @param  {[array]} copyableRanges [包含定义cell对象的数组]
					 */
					modifyCopyableRange:(copyableRanges)=>{},
					/**
					 * [修改cell数据后触发]
					 * @param  {[number]} row         [行索引]
					 * @param  {[number]} column      [列索引]
					 * @param  {[object]} valueHolder [可以修改.value值的对象]
					 * @param  {[string]} ioMode      [被触发的函数名称]
					 */
					modifyData:(row,column,valueHolder,ioMode)=>{},
					/**
					 * [getCell 方法获取cell坐标触发]
					 * @param  {[number]}  row     [行索引]
					 * @param  {[number]}  column  [列索引]
					 * @param  {[boolean]} topmost [true返回TD Element]
					 */
					modifyGetCellCoords:(row,column,topmost)=>{},
					/**
					 * [修改数据行后触发]
					 * @param  {[number]} row [修改数据行的索引]
					 */
					modifyRow:(row)=>{},
					/**
					 * [description]
					 * @param  {[type]} row [description]
					 * @return {[type]}     [description]
					 */
					modifyRowData:(row)=>{},
					/**
					 * [修改行头部后触发]
					 * @param  {[number]} row [行的索引]
					 */
					modifyRowHeader:(row)=>{},
					/**
					 * [修改行头部宽度时触发]
					 */
					modifyRowHeaderWidth:(rowHeaderWidth)=>{},
					/**
					 * [修改行高度后触发]
					 * @param  {[number]} height [修改后高度]
					 * @param  {[number]} row    [行的索引]
					 */
					modifyRowHeight:(height,row)=>{},
					/**
					 * [Fired when the end of the selection is being modified]
					 * @param  {[CellCoords]} delta [Cell coords object declaring the delta of the new selection relative to the previous one.]
					 */
					modifyTransformEnd:(delta)=>{},
					/**
					 * [Fired when the start of the selection is being modified ]
					 * @param  {[CellCoords]} delta [Cell coords object declaring the delta of the new selection relative to the previous one.]
					 */
					modifyTransformStart:(delta)=>{},
					/**
					 * [loading value 后保存表的状态到本地]
					 * @param  {[string]} key              [键名]
					 * @param  {[object]} valuePlaceholder [valuePlaceholder.value]
					 */
					persistentStateLoad:(key,valuePlaceholder)=>{},
					/**
					 * [重置本地table状态]
					 * @param  {[string]} key [键名]
					 */
					persistentStateReset:(key)=>{},
					/**
					 * [保存表的状态(修改cell大小)到本地]
					 * @param  {[string]} key   [键名称]
					 * @param  {[mix]}    value [值]
					 */
					persistentStateSave:(key,value)=>{},
					/**
					 * [用于在定义的时间段内跳过长度缓存计算]
					 * @param  {[number]} delay [延迟的时间]
					 */
					skipLengthCache:(delay)=>{},
					/**
					 * [Fired when a column index is about to be de-modified by a callback function.]
					 * @param  {[number]} column [列索引]
					 */
					unmodifyCol:(column)=>{},
					/**
					 * [Fired when a physical row index is about to be de-modified by a callback function.]
					 * @param  {[number]} row [行索引]
					 */
					unmodifyRow:(row)=>{}
				}
			}
		},
		methods:{
			howToCallMethod(){
				/*this.$refs.testHot.hotInstance//call core methods*/
				let hot = this.$refs.testHot.hotInstance;//include core methods object
				/*Example:
				hot.addHook('beforeInit', myCallback);
				详细的core方法见core.js
				*/

			},
			/**
			 * [exportCsv 导出csv文件]
			 */
			exportCsv(){
				var downLoad = this.$refs.testHot.hotInstance.getPlugin('exportFile');
				downLoad.downloadFile('csv', {
					bom: false,//编码方式
					columnDelimiter: ',',//列的分隔符
					columnHeaders: true,//是否导出列头
					exportHiddenColumns: true,//是否导出隐藏的列
					exportHiddenRows: true,//是否导出隐藏的行
					fileExtension: 'csv',//设置文件的后缀名
					filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',//设置文件的名称
					mimeType: 'text/csv',//设置描述消息内容类型的因特网标准
					rowDelimiter: '\r\n',//设置行分隔符
					rowHeaders: true//是否导出行头
				});
			},
			getInitializedElements(colIndex){
				var div = document.createElement('div');
				var input = document.createElement('input');
				div.className = 'filterHeader';
				this.addEventListeners(input, colIndex);
				div.appendChild(input);
				return div;
			},
			addEventListeners (input, colIndex){
				var self = this
				input.addEventListener('keydown', function(event) {
					self.searchInput(colIndex, event);
				});
			},
			searchInput(colIndex, event){
				var filtersPlugin  = this.$refs.testHot.hotInstance.getPlugin('filters');
				filtersPlugin.removeConditions(colIndex);
				filtersPlugin.addCondition(colIndex, 'begins_with', [event.target.value]);
				filtersPlugin.filter();
			},
			getStepData(startRow,endRow,startCol,endCol){
				if(startRow > endRow || startCol > endCol){
					return false;
				}
				this.elTabSettings.items = [];
				for (startCol; (endCol - startCol) >= 0; startCol++) {
					let itemName = this.$refs.testHot.hotInstance.getColHeader(startCol);
					this.elTabSettings.items.push({prop:itemName,label:itemName});
				}
				for ( startRow ; (endRow - startRow) >= 0; startRow++) {
					let arr = this.$refs.testHot.hotInstance.getDataAtRow(startRow);
					let obj = {};
					for (var i = arr.length - 1; i >= 0; i--) {
						let key = this.$refs.testHot.hotInstance.getColHeader(i);
						obj[key] = arr[i];
					}
					//console.dir(obj)
					this.elTabSettings.data.push(obj);
				}
				//console.dir(this.elTabSettings.data);
				this.elTabSettings.show = true
			},
			customValidator(){

			}
		},
		created(){
			(function(Handsontable){
				function levelValidator(query, callback) {
			    	if(query < 1){
			    		callback(false);
			    	}else{
			    		callback(true);
			    	}
			  	};
			  	function customRender(instance, td, row, col, prop, value, cellProperties){
			  		//自定义渲染代码
			  		Handsontable.renderers.BaseRenderer.apply(this, arguments);
			  	};
				Handsontable.validators.registerValidator('my.levelValidator', levelValidator);//自定义验证器（修改以后出发）
				Handsontable.renderers.registerRenderer('my.customRender', customRender);//注册自定义渲染
			})(Handsontable)
		},
		components:{
			HotTable
		}
	}

</script>
<style>
	@import "../../../node_modules/handsontable/dist/handsontable.full.css";
</style>
