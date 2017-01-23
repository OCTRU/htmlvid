/*
* HTMLVid Embed Plugin based on YouTube Plugin by Jonnas Fonini
*
* @author Tim Cranston
* @version 0.0.1
*/
( function() {
	CKEDITOR.plugins.add( 'htmlvid',
	{
		lang: [ 'en'],
		init: function( editor )
		{
			editor.addCommand( 'htmlvid', new CKEDITOR.dialogCommand( 'htmlvid', {
				allowedContent: 'div{*}; iframe{*}[!width,!height,!src,!frameborder,!allowfullscreen]; object param[*]'
			}));

			editor.ui.addButton( 'Htmlvid',
			{
				label : editor.lang.htmlvid.button,
				toolbar : 'insert',
				command : 'htmlvid',
				icon : this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add( 'htmlvid', function ( instance )
			{
				var video;

				return {
					title : editor.lang.htmlvid.title,
					minWidth : 500,
					minHeight : 200,
					contents :
						[{
							id : 'htmlvidPlugin',
							expand : true,
							elements :
								[{
									type : 'hbox',
									widths : [ '70%', '15%', '15%' ],
									children :
									[
										{
											id : 'txtUrl',
											type : 'text',
											label : editor.lang.htmlvid.txtUrl,
											onChange : function ( api )
											{
												handleVidLinkChange( this, api );
											},
											onKeyUp : function ( api )
											{
												handleVidLinkChange( this, api );
											},
											validate : function ()
											{
												if ( this.isEnabled() )
												{
													if ( !this.getValue() )
													{
														alert( editor.lang.htmlvid.noCode );
														return false;
													}
													else{
														if(this.getValue().endsWith(".mp4") === false ){
															alert( editor.lang.htmlvid.invalidUrl );
															return false;
														}
													}
												}
											}
										},
										{
											type : 'text',
											id : 'txtWidth',
											width : '60px',
											label : editor.lang.htmlvid.txtWidth,
											'default' : editor.config.htmlvid_width != null ? editor.config.htmlvid_width : '640',
											validate : function ()
											{
												if ( this.getValue() )
												{
													var width = parseInt ( this.getValue() ) || 0;

													if ( width === 0 )
													{
														alert( editor.lang.htmlvid.invalidWidth );
														return false;
													}
												}
												else {
													alert( editor.lang.htmlvid.noWidth );
													return false;
												}
											}
										},
										{
											type : 'text',
											id : 'txtHeight',
											width : '60px',
											label : editor.lang.htmlvid.txtHeight,
											'default' : editor.config.htmlvid_height != null ? editor.config.htmlvid_height : '360',
											validate : function ()
											{
												if ( this.getValue() )
												{
													var height = parseInt ( this.getValue() ) || 0;

													if ( height === 0 )
													{
														alert( editor.lang.htmlvid.invalidHeight );
														return false;
													}
												}
												else {
													alert( editor.lang.htmlvid.noHeight );
													return false;
												}
											}
										}
									]
								},
								{
									type : 'hbox',
									widths : [ '100%' ],
									children :
										[
											{
												id : 'chkResponsive',
												type : 'checkbox',
												label : editor.lang.htmlvid.txtResponsive,
												'default' : editor.config.htmlvid_responsive != null ? editor.config.htmlvid_responsive : false
											}
										]
								}
							]
						}
					],
					onOk: function()
					{
						var content = '';
						var responsiveStyle='';

						
						var url = this.getValueOf( 'htmlvidPlugin', 'txtUrl' );
						var width = this.getValueOf( 'htmlvidPlugin', 'txtWidth' );
						var height = this.getValueOf( 'htmlvidPlugin', 'txtHeight' );

							
						if ( this.getContentElement( 'htmlvidPlugin', 'chkResponsive').getValue() === true ) {
							content += '<div class="htmlvid-embed-wrapper" style="position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden;">';
							responsiveStyle = 'style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"';
						}
								
						content += '<video width="' + width + '" height="' + height + '" controls '+ responsiveStyle +'>';
						content += '<source src="' + url + '" type="video/mp4">';
						content += 'Your browser does not support the video tag.';
						content += '</video>';
							

						if ( this.getContentElement( 'htmlvidPlugin', 'chkResponsive').getValue() === true ) {
							content += '</div>';
						}
					
						
						var element = CKEDITOR.dom.element.createFromHtml( content );
						var instance = this.getParentEditor();
						instance.insertElement(element);
					}
				};
			});
		}
	});
})();

function handleVidLinkChange( el, api )
{
	if ( el.getValue().length > 0 )
	{
		el.getDialog().getContentElement( 'htmlvidPlugin', 'txtEmbed' ).disable();
	}
	else {
		el.getDialog().getContentElement( 'htmlvidPlugin', 'txtEmbed' ).enable();
	}
}

function handleEmbedChange( el, api )
{
	if ( el.getValue().length > 0 )
	{
		el.getDialog().getContentElement( 'htmlvidPlugin', 'txtUrl' ).disable();
	}
	else {
		el.getDialog().getContentElement( 'htmlvidPlugin', 'txtUrl' ).enable();
	}
}


