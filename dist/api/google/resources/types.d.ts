/**
 * ### @summary [Google Maps Place]{@link https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places}
 */
type GoogleMapsPlace = {
    id: string;
    name: string;
    types: string[];
    primary_type: string;
    address: string;
    phone_number?: string | undefined;
    open?: boolean | undefined;
    maps_link: string;
    website?: string | undefined;
    hours?: {
        [x: string]: GoogleMapsWeekDays;
    } | undefined;
    secondary_hours?: GoogleMapsWeekDays[] | undefined;
    status?: string | undefined;
    price?: string | undefined;
    rating?: number | undefined;
    user_ratings?: number | undefined;
    reviews?: GoogleMapsReview[] | undefined;
    editorial?: string | undefined;
    payment?: string[] | undefined;
    parking?: (GoogleMapsParking & {
        valet: boolean;
    }) | undefined;
    sub_destinations?: GoogleMapsSubDestination[] | undefined;
    fuel: GoogleMapsFuelPrices[];
};
type GoogleMapsParking = {
    free?: GoogleMapsFreeParking | undefined;
    paid?: GoogleMapsPaidParking | undefined;
};
type GoogleMapsFreeParking = {
    lot?: boolean | undefined;
    street?: boolean | undefined;
    garage?: boolean | undefined;
};
type GoogleMapsPaidParking = {
    lot?: boolean | undefined;
    street?: boolean | undefined;
    garage?: boolean | undefined;
};
type GoogleMapsWeekDays = {
    Monday?: string | undefined;
    Tuesday?: string | undefined;
    Wednesday?: string | undefined;
    Thursday?: string | undefined;
    Friday?: string | undefined;
    Saturday?: string | undefined;
    Sunday?: string | undefined;
};
type GoogleMapsReview = {
    text: string;
    rating: number;
    published: string;
};
type GoogleMapsFuelPrices = {
    type: string;
    price: string;
};
type GoogleGeocodingResult = {
    address_components: GeocodingAddressComponent[];
    formatted_address: string;
    geometry: GeocodingGeometry;
    place_id: string;
    types: string[];
};
type GeocodingAddressComponent = {
    types: string[];
    long_name: string;
    short_name: string;
};
type GeocodingGeometry = {
    bounds?: GeocodingBounds | undefined;
    location: {
        lat: number;
        lng: number;
    };
    location_type: string;
    viewport: GeocodingBounds;
};
type GeocodingBounds = {
    northeast: {
        lat: number;
        lng: number;
    };
    southwest: {
        lat: number;
        lng: number;
    };
};
type GoogleSheetsSpreadsheet = {
    spreadsheetId?: string | undefined;
    spreadsheetUrl?: string | undefined;
    properties?: GoogleSheetsSpreadsheetProperties | undefined;
    sheets?: GoogleSheetsSheet[] | undefined;
    developerMetadata?: GoogleSheetsDeveloperMetadata[] | undefined;
    dataSources?: GoogleSheetsDataSource[] | undefined;
    dataSourceSchedules?: GoogleSheetsDataSourceSchedule[] | undefined;
};
type GoogleSheetsSpreadsheetProperties = {
    title?: string | undefined;
    locale?: string | undefined;
    autoRecalc?: string | undefined;
    timeZone?: string | undefined;
    defaultFormat?: GoogleSheetsCellFormat | undefined;
    iterativeCalculationSettings?: GoogleSheetsIterativeCalculationSettings | undefined;
    spreadsheetTheme?: GoogleSheetsDataSource[] | undefined;
};
type GoogleSheetsCellFormat = {
    numberFormat?: GoogleSheetsNumberFormat | undefined;
    backgroundColorStyle?: GoogleSheetsColorStyle | undefined;
    borders?: GoogleSheetsBorders | undefined;
    padding?: GoogleSheetsPadding | undefined;
    horizontalAlignment?: string | undefined;
    verticalAlignment?: string | undefined;
    wrapStrategy?: string | undefined;
    textDirection?: string | undefined;
    textFormat?: GoogleSheetsTextFormat | undefined;
    hyperlinkDisplayType?: string | undefined;
    textRotation?: GoogleSheetsTextRotation | undefined;
};
type GoogleSheetsNumberFormat = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#NumberFormatType
     */
    type: string;
    pattern: string;
};
type GoogleSheetsTextRotation = {
    angle?: number | undefined;
    vertical?: boolean | undefined;
};
type GoogleSheetsIterativeCalculationSettings = {
    maxIterations?: number | undefined;
    convergenceThreshold?: number | undefined;
};
type GoogleSheetsColorStyle = {
    rgbColor?: Object | undefined;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ThemeColorType
     */
    themeColor?: string | undefined;
};
type GoogleSheetsBorders = {
    top?: GoogleSheetsBorder | undefined;
    bottom?: GoogleSheetsBorder | undefined;
    left?: GoogleSheetsBorder | undefined;
    right?: GoogleSheetsBorder | undefined;
};
type GoogleSheetsPadding = {
    top?: number | undefined;
    bottom?: number | undefined;
    left?: number | undefined;
    right?: number | undefined;
};
type GoogleSheetsBorder = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#Style
     */
    style?: string | undefined;
    width?: number | undefined;
    color?: Object | undefined;
    colorStyle?: GoogleSheetsColorStyle | undefined;
};
type GoogleSheetsTextFormat = {
    foregroundColor?: Object | undefined;
    foregroundColorStyle?: GoogleSheetsColorStyle | undefined;
    fontFamily?: string | undefined;
    fontSize?: number | undefined;
    bold?: boolean | undefined;
    italic?: boolean | undefined;
    strikethrough?: boolean | undefined;
    underline?: boolean | undefined;
    link?: {
        uri: string;
    } | undefined;
};
type GoogleSheetsDataSource = {
    dataSourceId?: string | undefined;
    spec?: GoogleSheetsDataSourceSpec | undefined;
    calculatedColumns?: GoogleSheetsDataSourceColumn | undefined;
    sheetId?: number | undefined;
};
type GoogleSheetsDataSourceSpec = {
    parameters?: GoogleSheetsDataSourceParameter[] | undefined;
    bigQuery?: GoogleSheetsDataSourceBigQuerySpec | undefined;
};
type GoogleSheetsDataSourceColumn = {
    reference: {
        name: string;
    };
    formula: string;
};
type GoogleSheetsDataSourceParameter = {
    name?: string | undefined;
    namedRangeId?: string | undefined;
    range?: GoogleSheetsGridRange | undefined;
};
type GoogleSheetsDataSourceBigQuerySpec = {
    projectId?: string | undefined;
    querySpec?: {
        rawQuery: string;
    } | undefined;
    tableSpec?: GoogleSheetsBigQueryTableSpec | undefined;
};
type GoogleSheetsBigQueryTableSpec = {
    tableProjectId?: string | undefined;
    tableId?: string | undefined;
    datasetId?: string | undefined;
};
type GoogleSheetsGridRange = {
    sheetId?: number | undefined;
    startRowIndex?: number | undefined;
    endRowIndex?: number | undefined;
    startColumnIndex?: number | undefined;
    endColumnIndex?: number | undefined;
};
type GoogleSheetsDataSourceSchedule = {
    enabled?: boolean | undefined;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#DataSourceRefreshScope
     */
    refreshScope?: string | undefined;
    nextRun?: GoogleSheetsInterval | undefined;
    dailySchedule?: {
        startTime: GoogleSheetsTimeOfDay;
    } | undefined;
    weeklySchedule?: {
        startTime: GoogleSheetsTimeOfDay;
        daysOfWeek: string;
    } | undefined;
    monthlySchedule?: {
        startTime: GoogleSheetsTimeOfDay;
        daysOfMonth: number;
    } | undefined;
};
type GoogleSheetsInterval = {
    startTime: string;
    endTime: string;
};
type GoogleSheetsTimeOfDay = {
    hours?: number | undefined;
    minutes?: number | undefined;
    seconds?: number | undefined;
    nanos?: number | undefined;
};
type GoogleSheetsNamedRange = {
    namedRangeId: string;
    name: string;
    range: GoogleSheetsGridRange;
};
type GoogleSheetsDeveloperMetadata = {
    metadataId: number;
    metadataKey: string;
    metadataValue: string;
    location: GoogleSheetsDeveloperMetadataLocation;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.developerMetadata#DeveloperMetadata.DeveloperMetadataVisibility
     */
    visibility: string;
};
type GoogleSheetsDeveloperMetadataLocation = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.developerMetadata#DeveloperMetadata.DeveloperMetadataLocationType
     */
    locationType: string;
    spreadsheet?: boolean | undefined;
    sheetId?: number | undefined;
    dimensionRange?: GoogleSheetsDimensionRange | undefined;
};
type GoogleSheetsDimensionRange = {
    sheetId: number;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/Dimension
     */
    spreadsheet?: string | undefined;
    startIndex?: number | undefined;
    endIndex?: number | undefined;
};
type GoogleSheetsSheet = {
    properties?: GoogleSheetsSheetProperties | undefined;
    data?: GoogleSheetsGridData[] | undefined;
    merges?: GoogleSheetsGridRange[] | undefined;
    conditionalFormats?: GoogleSheetsPadding | undefined;
    filterViews?: string | undefined;
    protectedRanges?: string | undefined;
    basicFilter?: string | undefined;
    charts?: string | undefined;
    bandedRanges?: GoogleSheetsTextFormat | undefined;
    developerMetadata?: string | undefined;
    rowGroups?: GoogleSheetsTextRotation | undefined;
    columnGroups?: string | undefined;
    slicers?: GoogleSheetsTextRotation | undefined;
};
type GoogleSheetsGridData = {
    startRow?: number | undefined;
    startColumn?: number | undefined;
    rowData?: {
        values: GoogleSheetsCellData[];
    } | undefined;
    rowMetadata?: GoogleSheetsDimensionProperties[] | undefined;
    columnMetadata?: GoogleSheetsDimensionProperties[] | undefined;
};
type GoogleSheetsSheetProperties = {
    sheetId?: number | undefined;
    title?: string | undefined;
    index?: number | undefined;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetType
     */
    sheetType?: string | undefined;
    gridProperties?: GoogleSheetsGridProperties | undefined;
    hidden?: boolean | undefined;
    tabColor?: Object | undefined;
    tabColorStyle?: GoogleSheetsColorStyle | undefined;
    rightToLeft?: boolean | undefined;
    dataSourceSheetProperties?: GoogleSheetsDataSourceSheetProperties | undefined;
};
type GoogleSheetsGridProperties = {
    rowCount?: number | undefined;
    columnCount?: number | undefined;
    frozenRowCount?: number | undefined;
    frozenColumnCount?: number | undefined;
    hideGridlines?: boolean | undefined;
    rowGroupControlAfter?: boolean | undefined;
    columnGroupControlAfter?: boolean | undefined;
};
type GoogleSheetsDataSourceSheetProperties = {
    dataSourceId: string;
    columns?: GoogleSheetsDataSourceColumn[] | undefined;
    dataExecutionStatus?: GoogleSheetsDataExecutionStatus | undefined;
};
type GoogleSheetsDataExecutionStatus = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#DataExecutionState
     */
    state?: string | undefined;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#DataExecutionErrorCode
     */
    errorCode?: string | undefined;
    errorMessage?: string | undefined;
    lastRefreshTime?: string | undefined;
};
type GoogleSheetsCellData = {
    userEnteredValue?: GoogleSheetsExtendedValue | undefined;
    effectiveValue?: GoogleSheetsExtendedValue | undefined;
    formattedValue?: string | undefined;
    userEnteredFormat?: GoogleSheetsCellFormat | undefined;
    effectiveFormat?: GoogleSheetsCellFormat | undefined;
    hyperlink?: string | undefined;
    note?: string | undefined;
    textFormatRuns?: {
        startIndex: number;
        format: GoogleSheetsTextFormat;
    } | undefined;
    dataValidation?: GoogleSheetsDataValidationRule | undefined;
    pivotTable?: GoogleSheetsPivotTable | undefined;
    dataSourceTable?: any;
    dataSourceFormula?: any;
};
type GoogleSheetsExtendedValue = {
    numberValue?: number | undefined;
    stringValue?: string | undefined;
    boolValue?: boolean | undefined;
    formulaValue?: string | undefined;
    errorValue?: {
        type: string;
        message: string;
    } | undefined;
};
type GoogleSheetsDataValidationRule = {
    condition?: GoogleSheetsBooleanCondition | undefined;
    inputMessage?: string | undefined;
    strict?: boolean | undefined;
    showCustomUi?: boolean | undefined;
};
type GoogleSheetsBooleanCondition = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ConditionType
     */
    type?: string | undefined;
    values?: GoogleSheetsConditionValue[] | undefined;
};
type GoogleSheetsConditionValue = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#RelativeDate
     */
    relativeDate?: string | undefined;
    userEnteredValue?: string | undefined;
};
type GoogleSheetsPivotTable = {
    rows?: GoogleSheetsPivotGroup[] | undefined;
    columns?: GoogleSheetsPivotGroup[] | undefined;
    filterSpecs?: GoogleSheetsPivotFilterSpec[] | undefined;
    values?: GoogleSheetsPivotValue[] | undefined;
    /**
     * = https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#PivotValueLayout
     */
    valueLayout?: string | undefined;
    dataExecutionStatus?: GoogleSheetsDataExecutionStatus | undefined;
    source?: GoogleSheetsGridRange | undefined;
    dataSourceId?: string | undefined;
};
type GoogleSheetsPivotGroup = {
    showTotals?: boolean[] | undefined;
    valueMetadata?: GoogleSheetsPivotGroupValueMetadata[] | undefined;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#SortOrder
     */
    sortOrder?: string | undefined;
    valueBucket?: GoogleSheetsPivotGroupSortValueBucket | undefined;
    repeatHeadings?: boolean | undefined;
    label?: string | undefined;
    groupRule?: GoogleSheetsPivotGroupRule | undefined;
    groupLimit?: GoogleSheetsPivotGroupLimit | undefined;
    sourceColumnOffset?: number | undefined;
    dataSourceColumnReference?: {
        name: string;
    } | undefined;
};
type GoogleSheetsPivotGroupValueMetadata = {
    value?: GoogleSheetsExtendedValue | undefined;
    collapsed?: boolean | undefined;
};
type GoogleSheetsPivotGroupSortValueBucket = {
    valuesIndex?: number | undefined;
    buckets?: GoogleSheetsExtendedValue[] | undefined;
};
type GoogleSheetsPivotGroupLimit = {
    countLimit?: number | undefined;
    applyOrder?: number | undefined;
};
type GoogleSheetsPivotGroupRule = {
    manualRule?: GoogleSheetsManualRule | undefined;
    histogramRule?: GoogleSheetsHistogramRule | undefined;
    dateTimeRule?: GoogleSheetsDateTimeRule | undefined;
};
type GoogleSheetsManualRule = {
    groups?: GoogleSheetsManualRuleGroup[] | undefined;
};
type GoogleSheetsManualRuleGroup = {
    groupName?: GoogleSheetsExtendedValue | undefined;
    items?: GoogleSheetsExtendedValue[] | undefined;
};
type GoogleSheetsHistogramRule = {
    interval?: number | undefined;
    start?: number | undefined;
    end?: number | undefined;
};
type GoogleSheetsDateTimeRule = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#DateTimeRuleType
     */
    type?: string | undefined;
};
type GoogleSheetsPivotFilterSpec = {
    filterCriteria?: GoogleSheetsPivotFilterCriteria | undefined;
    columnOffsetIndex?: number | undefined;
    dataSourceColumnReference?: {
        name: string;
    } | undefined;
};
type GoogleSheetsPivotFilterCriteria = {
    visibleValues?: string[] | undefined;
    condition?: GoogleSheetsBooleanCondition | undefined;
    visibleByDefault?: boolean | undefined;
};
type GoogleSheetsPivotValue = {
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#PivotValueSummarizeFunction
     */
    summarizeFunction?: string | undefined;
    name?: string | undefined;
    /**
     * - https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/pivot-tables#PivotValueCalculatedDisplayType
     */
    calculatedDisplayType?: string | undefined;
    sourceColumnOffset?: number | undefined;
    formula?: string | undefined;
    dataSourceColumnReference?: {
        name: string;
    } | undefined;
};
//# sourceMappingURL=types.d.ts.map