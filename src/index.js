class Node {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  #head;
  #tail;
  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.#head === null) this.#head = node;
    const previousTail = this.#tail;
    if (previousTail !== null) previousTail.next = node;
    this.#tail = node;
  }

  prepend(value) {
    const head = this.#head;
    const node = new Node(value, head);
    if (head === null) this.#tail = node;
    this.#head = node;
  }

  size() {
    return this.#loop()[0];
  }

  getHead() {
    const head = this.#head;
    if (head) return head.data;
  }

  getTail() {
    const tail = this.#tail;
    if (tail) return tail.data;
  }

  findIndex(value) {
    const result = this.#loop(null, value);
    if (!Array.isArray(result)) return result;
    return -1;
  }

  pop() {
    const head = this.#head;
    if (head) {
      this.#head = head.next;
      if (this.#head === null) this.#tail = null;
      return head.data;
    }
  }

  contains(value) {
    const result = this.#loop(null, value);
    if (!Array.isArray(result)) return true;
    return false;
  }

  at(index) {
    const result = this.#loop(index, null);
    if (!Array.isArray(result)) return result.data;
  }

  toString() {
    let temp = this.#head;
    if (!temp) return "";

    let templated = ``;
    while (temp !== null) {
      templated += `(${temp.data}) -> `;
      temp = temp.next;
    }

    templated += "null";

    return templated;
  }

  insertAt(index, ...values) {
    if (index < 0) throw RangeError("Can't have indexes in negative my friend");
    else if (values.length <= 0) throw Error("Joke ?");

    let result = this.#loop(index, null);

    if (Array.isArray(result))
      throw RangeError("Brother way to greater indexies");

    const nextPreviousElement = result.next;

    values.forEach((e) => {
      const node = new Node(e);
      result.next = node;
      result = node;
    });

    result.next = nextPreviousElement;
  }

  removeAt(index) {
    if (index < 0) throw RangeError("Can't have indexes in negative my friend");

    const result = this.#loop(index, null);
    if (Array.isArray(result))
      throw RangeError("Brother way to greater indexies");

    if (index === 0) {
      this.pop();
      return;
    }

      const oneLessIndexiesResult = this.#loop(index - 1, null);
      const resultNext = result.next
      if (resultNext === null) this.#tail = oneLessIndexiesResult
      oneLessIndexiesResult.next = result.next;
      
  }

  #loop(index = null, value = null) {
    let temp = this.#head;
    let count = 0;
    while (temp !== null) {
      if (index !== null) if (count === index) return temp;
      if (value !== null) if (value === temp.data) return count;
      temp = temp.next;
      count++;
    }

    return [count];
  }
}














// i was too lazy to write the actual tests for this code.. but you can play with all methods
// some dummy data is created so you can test all methods

const list = new LinkedList();
list.append("dog");
list.append("bird");
list.prepend("Idk")
list.append("giraff");
list.append("crow");
list.append("snake");
list.append("lion");
list.append("Homo sapine")


console.log(list.size()); // 8
console.log(list.toString());  // (Idk) -> (dog) -> (bird) -> ...