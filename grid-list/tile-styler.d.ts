import { MdGridTile } from './grid-tile';
import { TileCoordinator } from './tile-coordinator';
/**
 * Sets the style properties for an individual tile, given the position calculated by the
 * Tile Coordinator.
 * TODO: internal
 */
export declare class TileStyler {
    _gutterSize: string;
    _rows: number;
    _rowspan: number;
    _cols: number;
    _direction: string;
    /**
     * Adds grid-list layout info once it is available. Cannot be processed in the constructor
     * because these properties haven't been calculated by that point.
     */
    init(_gutterSize: string, tracker: TileCoordinator, cols: number, direction: string): void;
    /**
     * Computes the amount of space a single 1x1 tile would take up (width or height).
     * Used as a basis for other calculations.
     * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
     * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
     * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
     */
    getBaseTileSize(sizePercent: number, gutterFraction: number): string;
    /**
     * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
     * @param offset Number of tiles that have already been rendered in the row/column.
     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @return Position of the tile as a CSS calc() expression.
     */
    getTilePosition(baseSize: string, offset: number): string;
    /**
     * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param span The tile's rowspan or colspan.
     * @return Size of the tile as a CSS calc() expression.
     */
    getTileSize(baseSize: string, span: number): string;
    /** Gets the style properties to be applied to a tile for the given row and column index. */
    setStyle(tile: MdGridTile, rowIndex: number, colIndex: number): void;
    /** Sets the horizontal placement of the tile in the list. */
    setColStyles(tile: MdGridTile, colIndex: number, percentWidth: number, gutterWidth: number): void;
    /** Calculates the total size taken up by gutters across one axis of a list. */
    getGutterSpan(): string;
    /** Calculates the total size taken up by tiles across one axis of a list. */
    getTileSpan(tileHeight: string): string;
    /**
     * Sets the vertical placement of the tile in the list.
     * This method will be implemented by each type of TileStyler.
     */
    setRowStyles(tile: MdGridTile, rowIndex: number, percentWidth: number, gutterWidth: number): void;
    /**
     * Calculates the computed height and returns the correct style property to set.
     * This method will be implemented by each type of TileStyler.
     */
    getComputedHeight(): [string, string];
}
/**
 * This type of styler is instantiated when the user passes in a fixed row height.
 * Example <md-grid-list cols="3" rowHeight="100px">
 * TODO: internal
 */
export declare class FixedTileStyler extends TileStyler {
    fixedRowHeight: string;
    constructor(fixedRowHeight: string);
    init(gutterSize: string, tracker: TileCoordinator, cols: number, direction: string): void;
    setRowStyles(tile: MdGridTile, rowIndex: number, percentWidth: number, gutterWidth: number): void;
    getComputedHeight(): [string, string];
}
/**
 * This type of styler is instantiated when the user passes in a width:height ratio
 * for the row height.  Example <md-grid-list cols="3" rowHeight="3:1">
 * TODO: internal
 */
export declare class RatioTileStyler extends TileStyler {
    /** Ratio width:height given by user to determine row height.*/
    rowHeightRatio: number;
    baseTileHeight: string;
    constructor(value: string);
    setRowStyles(tile: MdGridTile, rowIndex: number, percentWidth: number, gutterWidth: number): void;
    getComputedHeight(): [string, string];
    private _parseRatio(value);
}
export declare class FitTileStyler extends TileStyler {
    setRowStyles(tile: MdGridTile, rowIndex: number, percentWidth: number, gutterWidth: number): void;
}
