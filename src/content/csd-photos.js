// Builds the "photos" edition of a commissioning task.
//
// Same procedure, same wording, same translations as the animated edition —
// only the media changes: each step shows the actual connection diagram or
// photograph printed on that poster, cropped straight out of the CSD
// Commissioning Manual PDF at 200 dpi. Where the manual has no picture for a
// step (it does not illustrate "record and evaluate", for instance) the step
// keeps the animated edition's animation rather than showing nothing.
//
// The crops live in public/media/csd/ and are named after what they show, so
// any of them can be traced back to its poster.

const img = (name) => ({ type: 'image', src: `/media/csd/${name}.jpg` })

// base    the animated task module's default export
// photos  { [stepId]: 'crop-name' | ['crop-a', 'crop-b'] }
// meta    { id, order, title, summary }
export function photoVariant(base, photos, meta) {
  const steps = base.steps.map((s) => {
    const shot = photos[s.id]
    if (!shot) return s
    const list = Array.isArray(shot) ? shot : [shot]
    return { ...s, media: list.map(img) }
  })

  return {
    ...base,
    id: meta.id,
    order: meta.order,
    title: meta.title,
    summary: meta.summary,
    steps,
  }
}
