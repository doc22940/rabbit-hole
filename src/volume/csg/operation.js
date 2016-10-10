import { Box3 } from "../../math";

/**
 * A CSG operation.
 *
 * @class Operation
 * @submodule csg
 * @constructor
 * @param {OperationType} type - The type of this operation.
 * @param {Operation} ...children - Child operations.
 */

export class Operation {

	constructor(type, ...children) {

		/**
		 * The type of this operation.
		 *
		 * @property type
		 * @type OperationType
		 * @default null
		 */

		this.type = type;

		/**
		 * A list of operations.
		 *
		 * Right-hand side operands have precedence, meaning that the result of the
		 * first item in the list will be dominated by the result of the second one,
		 * etc.
		 *
		 * @property children
		 * @type Array
		 * @private
		 */

		this.children = children;

		/**
		 * The bounding box of this operation.
		 *
		 * @property bbox
		 * @type Box3
		 * @private
		 * @default null
		 */

		this.bbox = null;

	}

	/**
	 * The bounding box of this operation.
	 *
	 * @property boundingBox
	 * @type Box3
	 */

	get boundingBox() {

		return (this.bbox !== null) ? this.bbox : this.computeBoundingBox();

	}

	/**
	 * Calculates the bounding box of this operation.
	 *
	 * @method computeBoundingBox
	 * @return {Box3} The bounding box.
	 */

	computeBoundingBox() {

		const children = this.children;

		let i, l;

		this.bbox = new Box3();

		for(i = 0, l = children.length; i < l; ++i) {

			this.bbox.union(children[i].boundingBox);

		}

		return this.bbox;

	}

	/**
	 * Updates the specified material index.
	 *
	 * @method updateMaterialIndex
	 * @param {Number} index - The index of the material index that needs to be updated.
	 * @param {HermiteData} data0 - The target volume data.
	 * @param {HermiteData} data1 - Predominant volume data.
	 */

	updateMaterialIndex(index, data0, data1) {}

	/**
	 * Updates the specified edge.
	 *
	 * @method updateEdge
	 * @param {Number} indexA - The index of the starting grid point.
	 * @param {Number} indexB - The index of the ending grid point.
	 */

	updateEdge(indexA, indexB) {}

}