class ByteBuffer {
  constructor(size) {
    size = size || ByteBuffer.DefaultSize;

    this._buffer = Buffer.allocUnsafe(size) || new Buffer();
    this._offset = 0;
    this._end = 0;
  }

  static get DefaultSize() {
    return 256;
  }

  static get DefaultEncoding() {
    return 'utf-8';
  }

  get offset() {
    return this._offset;
  }

  set offset(value) {
    if (value < 0) throw new RangeError('Out of range.');
    if (value > this._end) throw new RangeError('Out of range.');

    this._offset = value;
  }

  get end() {
    return this._end;
  }

  set end(value) {
    if (value < this._end) throw new RangeError('Out of range.');
    if (!(value < this._buffer.length)) throw new RangeError('Out of range.');

    this._end = value;
  }

  get length() {
    return this._end - this._offset;
  }

  set length(value) {
    this.end = this._offset + value;
  }

  get capacity() {
    return this._buffer.length;
  }

  get buffer() {
    return this._buffer.slice(this._offset, this._end);
  }

  get fullBuffer() {
    return this._buffer;
  }

  reset() {
    this._offset = 0;
    this._end = 0;
  }

  skip(length) {
    this.offset += length;
  }

  drain(length) {
    if (length > this.length) throw new RangeError('Out of range.');

    this._buffer.copy(this._buffer, 0, this._offset + length, this._end);
    this._end = this.length - length;
    this._offset = 0;
  }

  slice(offset, end) {
    const length = this.length;

    offset = offset || 0;
    end = end || length;

    if (end > length) throw new RangeError('Out of range.');

    return this._buffer.slice(this._offset + offset, this._offset + end);
  }

  sliceNoCheck(offset, end) {
    return this._buffer.slice(this._offset + offset, this._offset + end);
  }
}

module.exports = ByteBuffer;
