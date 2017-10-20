{
	data:{
			state: {
				show: false,
				position: {
					top: 200,
					left: 100
				}
			},
			inner: [
				{
					title: 'Welcome man',
					disabled: false,
					evt: function() {
						console.log('xxxx')
					}
				},
				{
					title: '不可用',
					disabled: true
				},
				{
					title: '共享',
					disabled: false,
					children: {
						state: {
							show: false,
							position: {
								top: 270,
								left: 202
							}
						},
						inner: [
							{
								title: '邮件',
								disabled: true
							},
							{
								title: 'AirDrop',
								evt: function() {
									console.log('Not !')
								}
							},
							{
								title: '其它',
								disabled: false,
								children: {
									state: {
										show: false,
										position: {
											top: 320,
											left: 270
										}
									},
									inner: [
										{
											title: 'QQ',
											disabled: true
										},
										{
											title: '微信',
											evt: function() {
												console.log('Not !')
											}
										},
										{
											title: '信息',
											evt: function() {

											}
										}
									]
								}
							}
						]
					}
				},
				{
					type: 'separator'
				},
				{
					title: '删除',
					evt: function() {
						console.log('del')
					}
				}
			]
		},
	evt: null
}