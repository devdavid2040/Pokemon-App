export default function validate(input) {
  let errors = {};

  // Validate name
  if (!input.name) {
    errors.name = "Name can't be empty";
  } else if (!/[a-zA-Z]{4,10}/.test(input.name)) {
    errors.name = "Incorrect name";
  }

  // Validate hp
  if (!input.hp) {
    errors.hp = "HP can't be empty";
  } else if (!/^\d+$/.test(input.hp)) {
    errors.hp = "HP must be a integer";
  }

  // Validate attack
  if (!input.attack) {
    errors.attack = "Attack can't be empty";
  } else if (!/^\d+$/.test(input.attack)) {
    errors.attack = "Attack must be a integer";
  }

  // Validate defense
  if (!input.defense) {
    errors.defense = "Defense can't be empty";
  } else if (!/^\d+$/.test(input.defense)) {
    errors.defense = "Defense must be a integer";
  }

  // Validate speed
  if (!input.speed) {
    errors.speed = "Speed can't be empty";
  } else if (!/^\d+$/.test(input.speed)) {
    errors.speed = "Defense must be a integer";
  }

  // Validate height
  if (!input.height) {
    errors.height = "Height can't be empty";
  } else if (!/^\d+$/.test(input.height)) {
    errors.height = "Height must be a integer";
  }

  // Validate weight
  if (!input.weight) {
    errors.weight = "Weight can't be empty";
  } else if (!/^\d+$/.test(input.weight)) {
    errors.weight = "Weight must be a integer";
  }

  // Validate image
  if (
    input.image !== "" &&
    !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)
  ) {
    errors.image = "Image must be a URL";
  }

  return errors;
}
