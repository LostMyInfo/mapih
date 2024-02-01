// @ts-check

/**
 * ### @summary [Google Maps Place]{@link https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places}
 * @typedef {Object} GoogleMapsPlace
 * @property {string} id
 * @property {string} name
 * @property {string[]} types
 * @property {string} primary_type
 * @property {string} address
 * @property {string} [phone_number]
 * @property {boolean} [open]
 * @property {string} maps_link
 * @property {string} [website]
 * @property {{[x: string]: GoogleMapsWeekDays}} [hours] 
 * @property {GoogleMapsWeekDays[]} [secondary_hours]
 * @property {string} [status]
 * @property {string} [price]
 * @property {number} [rating]
 * @property {number} [user_ratings] 
 * @property {GoogleMapsReview[]} [reviews]
 * @property {string} [editorial]
 * @property {string[]} [payment]
 * @property {GoogleMapsParking & { valet: boolean}} [parking]
 * @property {GoogleMapsSubDestination[]} [sub_destinations]
 * @property {GoogleMapsFuelPrices[]} fuel
 * @property {GoogleMapsFuelPrices[]} editorial
 */
 
/**
 * @typedef {Object} GoogleMapsParking
 * @property {GoogleMapsFreeParking} [free]
 * @property {GoogleMapsPaidParking} [paid]
 */
  
/**
 * @typedef {Object} GoogleMapsFreeParking
 * @property {boolean} [lot]
 * @property {boolean} [street]
 * @property {boolean} [garage]
 */
 
/**
 * @typedef {Object} GoogleMapsPaidParking
 * @property {boolean} [lot]
 * @property {boolean} [street]
 * @property {boolean} [garage]
 */

/**
 * @typedef {Object} GoogleMapsWeekDays
 * @property {string} [Monday]
 * @property {string} [Tuesday]
 * @property {string} [Wednesday]
 * @property {string} [Thursday]
 * @property {string} [Friday]
 * @property {string} [Saturday]
 * @property {string} [Sunday]
 */

/**
 * @typedef {Object} GoogleMapsReview
 * @property {string} text
 * @property {number} rating
 * @property {string} published
 */

/**
 * @typedef {Object} GoogleMapsFuelPrices
 * @property {string} type
 * @property {string} price
 */

/**
 * @typedef {Object} GoogleGeocodingResult
 * @property {GeocodingAddressComponent[]} address_components
 * @property {string} formatted_address
 * @property {GeocodingGeometry} geometry
 * @property {string} place_id
 * @property {string[]} types
 */

/**
 * @typedef {Object} GeocodingAddressComponent
 * @property {string[]} types
 * @property {string} long_name
 * @property {string} short_name
 */

/**
 * @typedef {Object} GeocodingGeometry
 * @property {GeocodingBounds} [bounds]
 * @property {{lat: number, lng: number}} location
 * @property {string} location_type
 * @property {GeocodingBounds} viewport
 */

/**
 * @typedef {Object} GeocodingBounds
 * @property {{lat: number, lng: number}} northeast
 * @property {{lat: number, lng: number}} southwest
 */

/**
 * @typedef {Object} GoogleSheetsSpreadsheet
 * @property {string} [spreadsheetId]
 * @property {string} [spreadsheetUrl]
 * @property {GoogleSheetsSpreadsheetProperties} [properties]
 * @property {GoogleSheetsSheet[]} [sheets]
 * @property {GoogleSheetsNamedRange[]} [properties]
 * @property {GoogleSheetsDeveloperMetadata[]} [developerMetadata]
 * @property {GoogleSheetsDataSource[]} [dataSources]
 * @property {GoogleSheetsDataSourceSchedule[]} [dataSourceSchedules]
 */

/**
 * @typedef {Object} GoogleSheetsSpreadsheetProperties
 * @property {string} [title]
 * @property {string} [locale]
 * @property {string} [autoRecalc]
 * @property {string} [timeZone]
 * @property {GoogleSheetsCellFormat} [defaultFormat]
 * @property {GoogleSheetsIterativeCalculationSettings} [iterativeCalculationSettings]
 * @property {GoogleSheetsDataSource[]} [spreadsheetTheme]
 */

/**
 * @typedef {Object} GoogleSheetsCellFormat
 * @property {GoogleSheetsNumberFormat} [numberFormat]
 * @property {GoogleSheetsColorStyle} [backgroundColorStyle]
 * @property {GoogleSheetsBorders} [borders]
 * @property {GoogleSheetsPadding} [padding]
 * @property {string} [horizontalAlignment]
 * @property {string} [verticalAlignment]
 * @property {string} [wrapStrategy]
 * @property {string} [textDirection]
 * @property {GoogleSheetsTextFormat} [textFormat]
 * @property {string} [hyperlinkDisplayType]
 * @property {GoogleSheetsTextRotation} [textRotation]
 */

/**
 * @typedef {Object} GoogleSheetsNumberFormat
 * @property {string} type - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#NumberFormatType
 * @property {string} pattern
 */

/**
 * @typedef {Object} GoogleSheetsTextRotation
 * @property {number} [angle]
 * @property {boolean} [vertical]
 */

/**
 * @typedef {Object} GoogleSheetsIterativeCalculationSettings
 * @property {number} [maxIterations]
 * @property {number} [convergenceThreshold]
 */

/**
 * @typedef {Object} GoogleSheetsColorStyle
 * @property {Object} [rgbColor]
 * @property {string} [themeColor] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ThemeColorType
 */

/**
 * @typedef {Object} GoogleSheetsBorders
 * @property {GoogleSheetsBorder} [top]
 * @property {GoogleSheetsBorder} [bottom]
 * @property {GoogleSheetsBorder} [left]
 * @property {GoogleSheetsBorder} [right]
 */

/**
 * @typedef {Object} GoogleSheetsPadding
 * @property {number} [top]
 * @property {number} [bottom]
 * @property {number} [left]
 * @property {number} [right]
 */

/**
 * @typedef {Object} GoogleSheetsBorder
 * @property {string} [style] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#Style
 * @property {number} [width]
 * @property {Object} [color]
 * @property {GoogleSheetsColorStyle} [colorStyle]
 */

/**
 * @typedef {Object} GoogleSheetsTextFormat
 * @property {Object} [foregroundColor]
 * @property {GoogleSheetsColorStyle} [foregroundColorStyle]
 * @property {string} [fontFamily]
 * @property {number} [fontSize]
 * @property {boolean} [bold]
 * @property {boolean} [italic]
 * @property {boolean} [strikethrough]
 * @property {boolean} [underline]
 * @property {{uri: string}} [link]
 */

/**
 * @typedef {Object} GoogleSheetsDataSource
 * @property {string} [dataSourceId]
 * @property {GoogleSheetsDataSourceSpec} [spec]
 * @property {GoogleSheetsDataSourceColumn} [calculatedColumns]
 * @property {number} [sheetId]
 */

/**
 * @typedef {Object} GoogleSheetsDataSourceSpec
 * @property {GoogleSheetsDataSourceParameter[]} [parameters]
 * @property {GoogleSheetsDataSourceBigQuerySpec} [bigQuery]
 */

/**
 * @typedef {Object} GoogleSheetsDataSourceColumn
 * @property {{name:string}} reference
 * @property {string} formula
 */

/**
 * @typedef {Object} GoogleSheetsDataSourceParameter
 * @property {string} [name]
 * @property {string} [namedRangeId]
 * @property {GoogleSheetsGridRange} [range]
 */

/**
 * @typedef {Object} GoogleSheetsDataSourceBigQuerySpec
 * @property {string} [projectId]
 * @property {{rawQuery: string}} [querySpec]
 * @property {GoogleSheetsBigQueryTableSpec} [tableSpec]
 */

/**
 * @typedef {Object} GoogleSheetsBigQueryTableSpec
 * @property {string} [tableProjectId]
 * @property {string} [tableId]
 * @property {string} [datasetId]
 */

/**
 * @typedef {Object} GoogleSheetsGridRange
 * @property {number} [sheetId]
 * @property {number} [startRowIndex]
 * @property {number} [endRowIndex]
 * @property {number} [startColumnIndex]
 * @property {number} [endColumnIndex]
 */

/**
 * @typedef {Object} GoogleSheetsDataSourceSchedule
 * @property {boolean} [enabled]
 * @property {string} [refreshScope] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#DataSourceRefreshScope
 * @property {GoogleSheetsInterval} [nextRun]
 * @property {{startTime: GoogleSheetsTimeOfDay}} [dailySchedule]
 * @property {{startTime: GoogleSheetsTimeOfDay, daysOfWeek: string}} [weeklySchedule]
 * @property {{startTime: GoogleSheetsTimeOfDay, daysOfMonth: number}} [monthlySchedule]
 */

/**
 * @typedef {Object} GoogleSheetsInterval
 * @property {string} startTime
 * @property {string} endTime
 */

/**
 * @typedef {Object} GoogleSheetsTimeOfDay
 * @property {number} [hours]
 * @property {number} [minutes]
 * @property {number} [seconds]
 * @property {number} [nanos]
 */

/**
 * @typedef {Object} GoogleSheetsNamedRange
 * @property {string} namedRangeId
 * @property {string} name
 * @property {GoogleSheetsGridRange} range
 */

/**
 * @typedef {Object} GoogleSheetsDeveloperMetadata
 * @property {number} metadataId
 * @property {string} metadataKey
 * @property {string} metadataValue
 * @property {GoogleSheetsDeveloperMetadataLocation} location
 * @property {string} visibility - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.developerMetadata#DeveloperMetadata.DeveloperMetadataVisibility
 */

/**
 * @typedef {Object} GoogleSheetsDeveloperMetadataLocation
 * @property {string} locationType - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.developerMetadata#DeveloperMetadata.DeveloperMetadataLocationType
 * @property {boolean} [spreadsheet]
 * @property {number} [sheetId]
 * @property {GoogleSheetsDimensionRange} [dimensionRange]
 */

/**
 * @typedef {Object} GoogleSheetsDimensionRange
 * @property {number} sheetId
 * @property {string} [spreadsheet] - https://developers.google.com/sheets/api/reference/rest/v4/Dimension
 * @property {number} [startIndex]
 * @property {number} [endIndex]
 */

/**
 * @typedef {Object} GoogleSheetsSheet
 * @property {GoogleSheetsSheetProperties} [properties]
 * @property {GoogleSheetsGridData[]} [data]
 * @property {GoogleSheetsGridRange[]} [merges]
 * @property {GoogleSheetsPadding} [conditionalFormats]
 * @property {string} [filterViews]
 * @property {string} [protectedRanges]
 * @property {string} [basicFilter]
 * @property {string} [charts]
 * @property {GoogleSheetsTextFormat} [bandedRanges]
 * @property {string} [developerMetadata]
 * @property {GoogleSheetsTextRotation} [rowGroups]
 * @property {string} [columnGroups]
 * @property {GoogleSheetsTextRotation} [slicers]
 */

/**
 * @typedef {Object} GoogleSheetsGridData
 * @property {number} [startRow]
 * @property {number} [startColumn]
 * @property {{values: GoogleSheetsCellData[]}} [rowData]
 * @property {GoogleSheetsDimensionProperties[]} [rowMetadata]
 * @property {GoogleSheetsDimensionProperties[]} [columnMetadata]
 */

/**
 * @typedef {Object} GoogleSheetsSheetProperties
 * @property {number} [sheetId]
 * @property {string} [title]
 * @property {number} [index]
 * @property {string} [sheetType] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetType
 * @property {GoogleSheetsGridProperties} [gridProperties]
 * @property {boolean} [hidden]
 * @property {Object} [tabColor]
 * @property {GoogleSheetsColorStyle} [tabColorStyle]
 * @property {boolean} [rightToLeft]
 * @property {GoogleSheetsDataSourceSheetProperties} [dataSourceSheetProperties]
 */

/**
 * @typedef {Object} GoogleSheetsGridProperties
 * @property {number} [rowCount]
 * @property {number} [columnCount]
 * @property {number} [frozenRowCount]
 * @property {number} [frozenColumnCount]
 * @property {boolean} [hideGridlines]
 * @property {boolean} [rowGroupControlAfter]
 * @property {boolean} [columnGroupControlAfter]
 */

/**
 * @typedef {Object} GoogleSheetsDataSourceSheetProperties
 * @property {string} dataSourceId
 * @property {GoogleSheetsDataSourceColumn[]} [columns]
 * @property {GoogleSheetsDataExecutionStatus} [dataExecutionStatus]
 */

/**
 * @typedef {Object} GoogleSheetsDataExecutionStatus
 * @property {string} [state] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#DataExecutionState
 * @property {string} [errorCode] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#DataExecutionErrorCode
 * @property {string} [errorMessage]
 * @property {string} [lastRefreshTime]
 */

/**
 * @typedef {Object} GoogleSheetsCellData
 * @property {GoogleSheetsExtendedValue} [userEnteredValue]
 * @property {GoogleSheetsExtendedValue} [effectiveValue]
 * @property {string} [formattedValue]
 * @property {GoogleSheetsCellFormat} [userEnteredFormat]
 * @property {GoogleSheetsCellFormat} [effectiveFormat]
 * @property {string} [hyperlink]
 * @property {string} [note]
 * @property {{startIndex: number, format: GoogleSheetsTextFormat}} [textFormatRuns]
 * @property {GoogleSheetsDataValidationRule} [dataValidation]
 * @property {GoogleSheetsPivotTable} [pivotTable]
 * @property {GoogleSheetsDataSourceTable} [dataSourceTable]
 * @property {GoogleSheetsDataSourceFormula} [dataSourceFormula]
 */

/**
 * @typedef {Object} GoogleSheetsExtendedValue
 * @property {number} [numberValue]
 * @property {string} [stringValue]
 * @property {boolean} [boolValue]
 * @property {string} [formulaValue]
 * @property {{type: string, message: string}} [errorValue]
 */

/**
 * @typedef {Object} GoogleSheetsDataValidationRule
 * @property {GoogleSheetsBooleanCondition} [condition]
 * @property {string} [inputMessage]
 * @property {boolean} [strict]
 * @property {boolean} [showCustomUi]
 */

/**
 * @typedef {Object} GoogleSheetsBooleanCondition
 * @property {string} [type] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ConditionType
 * @property {GoogleSheetsConditionValue[]} [values]
 */

/**
 * @typedef {Object} GoogleSheetsConditionValue
 * @property {string} [relativeDate] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#RelativeDate
 * @property {string} [userEnteredValue]
 */

/**
 * @typedef {Object} GoogleSheetsPivotTable
 * @property {GoogleSheetsPivotGroup[]} [rows]
 * @property {GoogleSheetsPivotGroup[]} [columns]
 * @property {GoogleSheetsPivotFilterSpec[]} [filterSpecs]
 * @property {GoogleSheetsPivotValue[]} [values]
 * @property {string} [valueLayout] = https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#PivotValueLayout
 * @property {GoogleSheetsDataExecutionStatus} [dataExecutionStatus]
 * @property {GoogleSheetsGridRange} [source]
 * @property {string} [dataSourceId]
 */

/**
 * @typedef {Object} GoogleSheetsPivotGroup
 * @property {boolean[]} [showTotals]
 * @property {GoogleSheetsPivotGroupValueMetadata[]} [valueMetadata]
 * @property {string} [sortOrder] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#SortOrder
 * @property {GoogleSheetsPivotGroupSortValueBucket} [valueBucket]
 * @property {boolean} [repeatHeadings]
 * @property {string} [label]
 * @property {GoogleSheetsPivotGroupRule} [groupRule]
 * @property {GoogleSheetsPivotGroupLimit} [groupLimit]
 * @property {number} [sourceColumnOffset]
 * @property {{name: string}} [dataSourceColumnReference]
 */

/**
 * @typedef {Object} GoogleSheetsPivotGroupValueMetadata
 * @property {GoogleSheetsExtendedValue} [value]
 * @property {boolean} [collapsed]
 */

/**
 * @typedef {Object} GoogleSheetsPivotGroupSortValueBucket
 * @property {number} [valuesIndex]
 * @property {GoogleSheetsExtendedValue[]} [buckets]
 */

/**
 * @typedef {Object} GoogleSheetsPivotGroupLimit
 * @property {number} [countLimit]
 * @property {number} [applyOrder]
 */

/**
 * @typedef {Object} GoogleSheetsPivotGroupRule
 * @property {GoogleSheetsManualRule} [manualRule]
 * @property {GoogleSheetsHistogramRule} [histogramRule]
 * @property {GoogleSheetsDateTimeRule} [dateTimeRule]
 */

/**
 * @typedef {Object} GoogleSheetsManualRule
 * @property {GoogleSheetsManualRuleGroup[]} [groups]
 */

/**
 * @typedef {Object} GoogleSheetsManualRuleGroup
 * @property {GoogleSheetsExtendedValue} [groupName]
 * @property {GoogleSheetsExtendedValue[]} [items]
 */

/**
 * @typedef {Object} GoogleSheetsHistogramRule
 * @property {number} [interval]
 * @property {number} [start]
 * @property {number} [end]
 */

/**
 * @typedef {Object} GoogleSheetsDateTimeRule
 * @property {string} [type] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#DateTimeRuleType
 */

/**
 * @typedef {Object} GoogleSheetsPivotFilterSpec
 * @property {GoogleSheetsPivotFilterCriteria} [filterCriteria]
 * @property {number} [columnOffsetIndex]
 * @property {{name: string}} [dataSourceColumnReference]
 */

/**
 * @typedef {Object} GoogleSheetsPivotFilterCriteria
 * @property {string[]} [visibleValues]
 * @property {GoogleSheetsBooleanCondition} [condition]
 * @property {boolean} [visibleByDefault]
 */

/**
 * @typedef {Object} GoogleSheetsPivotValue
 * @property {string} [summarizeFunction] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#PivotValueSummarizeFunction
 * @property {string} [name]
 * @property {string} [calculatedDisplayType] - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#PivotValueCalculatedDisplayType
 * @property {number} [sourceColumnOffset]
 * @property {string} [formula]
 * @property {{name: string}} [dataSourceColumnReference]
 */