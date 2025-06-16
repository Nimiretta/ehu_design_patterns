export function validateXmlName(name: string, context: 'tag' | 'attribute'): string[] {
  const errors: string[] = [];
  if (!name) errors.push(`${context === 'tag' ? 'Tag' : 'Attribute'} name cannot be empty`);
  if (!/^[A-Za-z_][\w\-.]*$/.test(name))
    errors.push(
      `${context === 'tag' ? 'Tag' : 'Attribute'} name must start with a letter or underscore, and contain only letters, digits, hyphens (-), underscores (_), or dots (.), got: "${name}"`,
    );
  if (/^xml/i.test(name))
    errors.push(`${context === 'tag' ? 'Tag' : 'Attribute'} name cannot start with "xml" (any case): "${name}"`);
  if (/\s/.test(name)) errors.push(`${context === 'tag' ? 'Tag' : 'Attribute'} name cannot contain spaces: "${name}"`);
  if (/[^A-Za-z0-9_\-.]/.test(name))
    errors.push(
      `${context === 'tag' ? 'Tag' : 'Attribute'} name contains invalid character(s): "${name}". Only letters, digits, hyphens (-), underscores (_), and dots (.) are allowed.`,
    );
  return errors;
}

export function validateXmlAttributeValue(value: string): string[] {
  return /[<>]/.test(value) ? ['Attribute value cannot contain < or >'] : [];
}
