<template>
	<div  class="table">
			<div class="handle-box">
        <button type="button" @click="hiddenCol('Country')">Country</button>
        <button type="button" @click="hiddenCol('Code')">Code</button>
        <button type="button" @click="hiddenCol('Currency')">Currency</button>
			</div>
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
					comments: true,//cell注释(和cell一起使用)
					cell:[
						{row: 1, col: 1, comment: {value: 'Some comment'}},//第2行第2列的cell添加注释
						{row: 2, col: 2, comment: {value: 'More comments'}}
					],					

					

					outsideClickDeselects: (event)=>{
						console.dir(1)
						this.elTabSettings.show = false;
						this.elTabSettings.data = [];
						this.elTabSettings.items = [];
						return false;
					},//取消选定
					beforeRowMove:(rows,target)=>{
						//console.dir(rows)
						//console.dir(rows)
					},
					afterRowMove:(rows,target)=>{
						console.dir('afterRowMove')
						console.dir(rows)
						console.dir('target')
						console.dir(target)
					},
					afterGetColHeader:(col, TH)=>{
						if (col >= 0 && TH.childElementCount < 2) {
						    TH.appendChild(this.getInitializedElements(col));
						}
					},
					afterGetRowHeader:(row,TH)=>{
						//console.dir(row)
					},
					beforeOnCellMouseDown: function(event, coords){
						if (coords.row === -1 && event.realTarget.nodeName === 'INPUT') {
							event.stopImmediatePropagation();
							this.deselectCell();
						}
					},
					beforeCreateCol:(index,amount,source)=>{
						//this.hotSettings.colHeaders.splice(index,0,'kkkkk');
					},
					afterCreateCol:(index,amount,source)=>{
						//this.hotSettings.colHeaders.pop();
						//this.hotSettings.colHeaders.push('newCol');
						//console.dir(index);
						//console.dir(amount);
						//console.dir(source);
						//console.dir(index)
						//console.dir(amount)
						//this.hotSettings.colHeaders[index];
						//console.dir(this.hotSettings.colHeaders[9]);
					},
					modifyRowData:(row)=>{
						//console.dir(row);
					},
					modifyData:(row,column,valueHolder,ioMode)=>{
						//console.dir(valueHolder);
					},
					afterUpdateSettings:(newSettings)=>{
						//newSettings.colHeaders[10] = 'sssss'
					},
					afterHideColumns:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{
						//console.dir(actionPossible)
					},
					afterSelection:(row, column, row2, column2, preventScrolling, selectionLayerLevel)=>{
						//console.dir('afterSelection')
						//console.dir(row)
						/*console.dir(column)
						console.dir(row2)
						console.dir(column2)
						console.dir(preventScrolling)
						console.dir(selectionLayerLevel)
						preventScrolling.value = true;*/
					},
					afterSelectionEnd:(row,column,row2,column2,selectionLayerLevel)=>{
						//console.dir(row);
						//console.dir(row2);
						//console.dir(column);
						//console.dir(column2);
						//console.dir(this.$refs.testHot.hotInstance.getColHeader(column2));
						
						this.getStepData(row,row2,column,column2);
						//console.dir(this.$refs.testHot.hotInstance.getDataAtRow(row))
					},
					afterSelectionEndByProp:(row,prop,row2,prop2,selectionLayerLevel)=>{
						//console.dir(row)
						//console.dir(row2)
					},
					/*modifyColHeader:(column)=>{
						console.dir('column');
					}*///绑定的钩子函数
					/*multiColumnSorting: {
						indicator: true
					}*/
					/*columnSummary:[
						{
							ranges: [
								[0],[10],[11,12]//设置需要计算的行
							],
							sourceColumn: 2,
							destinationRow: 0,//显示结果的行索引
							destinationColumn: 0,//显示结果的列索引
							reversedRowCoords: true,//行坐标反转，用来统计底部
							type: 'sum',//统计方式
							forceNumeric: true//严格的数字模式
						}
					]//统计*/
					/*comments: true,//注释开启
					cell: [
						{row: 1, col: 1, comment: {value: 'Some comment'}},
						{row: 2, col: 2, comment: {value: 'More comments'}}
					]//设置特定的cell的注释*/
				}
			}
		},
		methods:{
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
			newCol(param){
				/*this.data.push({
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
						});*/
				//this.hotSettings.hiddenColumns.columns=[0,1]
				//console.dir(param)
				/*let len = this.hotSettings.colHeaders.length;
				this.$refs.testHot.hotInstance.alter('insert_col',len + 1,1);
				var headers = this.hotSettings.colHeaders;
				headers[len] = param;
				for (var i = this.dataArray.length - 1; i >= 0; i--) {
					this.dataArray[i].hello = i
				}
				this.$refs.testHot.hotInstance.updateSettings({
					colHeaders:headers
				});//data是Array时，创建新列*/
				//console.dir(this.$refs.testHot.hotInstance.getColHeader());
				console.dir(this.$refs.testHot.hotInstance)
				var search = this.$refs.testHot.hotInstance.getPlugin('hiddenColumns');
				var hiddenColumns = this.hotSettings.hiddenColumns.columns

				let headers = this.$refs.testHot.hotInstance.getColHeader();
				for (var i = headers.length - 1; i >= 0; i--) {
					if(headers[i] == param){
						let index = this.hotSettings.hiddenColumns.columns.indexOf(i)
						if(  index > -1 ){
							hiddenColumns.splice(index,1)
						}else{
							hiddenColumns.push(i)
						}
					}
				}
				this.$refs.testHot.hotInstance.updateSettings({
					hiddenColumns: {
						columns:hiddenColumns,//隐藏的列index (0是第一列)
						indicators:false//是否显示隐藏标志
					}
				});
				//console.dir()
				//console.dir(this.$refs.testHot.hotInstance)
				//this.$refs.testHot.hotInstance.scrollViewportTo(18,1);//滚动到指定位置
				//console.dir(this.$refs.testHot.hotInstance.scrollViewportTo(18,1))
				/*var search = this.$refs.testHot.hotInstance.getPlugin('search');
				var queryResult = search.query('iphone');
				console.log(queryResult);
				this.$refs.testHot.hotInstance.render();//搜索*/
				//console.dir(this.$refs.testHot)
				/*var downLoad = this.$refs.testHot.hotInstance.getPlugin('exportFile');
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
				})//导出Excel文件*/

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
