package product

import (
	"bytes"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"math"
	"math/rand"
	"time"

	xdraw "golang.org/x/image/draw"
	"golang.org/x/image/vector"
)

const supersample = 2 // sweet spot for quality vs CPU

// GeneratePNGBlob generates a high-quality PNG and returns it as []byte.
func GeneratePNGBlob(
	width, height int,
	shapeCount int,
	seed int64,
) ([]byte, error) {

	if width <= 0 || height <= 0 {
		return nil, nil
	}

	if seed == 0 {
		seed = time.Now().UnixNano()
	}
	r := rand.New(rand.NewSource(seed))

	hiW := width * supersample
	hiH := height * supersample

	hi := image.NewRGBA(image.Rect(0, 0, hiW, hiH))
	draw.Draw(
		hi,
		hi.Bounds(),
		&image.Uniform{color.RGBA{245, 245, 245, 255}},
		image.Point{},
		draw.Src,
	)

	for i := 0; i < shapeCount; i++ {
		switch r.Intn(3) {
		case 0:
			drawRectAA(hi, r)
		case 1:
			drawCircleAA(hi, r)
		case 2:
			drawTriangleAA(hi, r)
		}
	}

	// Downscale with high quality filter
	lo := image.NewRGBA(image.Rect(0, 0, width, height))
	xdraw.CatmullRom.Scale(lo, lo.Bounds(), hi, hi.Bounds(), draw.Over, nil)

	var buf bytes.Buffer
	enc := png.Encoder{
		CompressionLevel: png.NoCompression, // large file, fast
	}
	if err := enc.Encode(&buf, lo); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

// -------------------- helpers --------------------

func randColor(r *rand.Rand) color.RGBA {
	return color.RGBA{
		uint8(r.Intn(220)),
		uint8(r.Intn(220)),
		uint8(r.Intn(220)),
		255,
	}
}

func drawRectAA(img *image.RGBA, r *rand.Rand) {
	maxW := img.Bounds().Dx() / 2
	maxH := img.Bounds().Dy() / 2
	if maxW <= 10 || maxH <= 10 {
		return
	}

	w := r.Intn(maxW-10) + 10
	h := r.Intn(maxH-10) + 10
	x := r.Intn(img.Bounds().Dx() - w)
	y := r.Intn(img.Bounds().Dy() - h)

	ras := vector.NewRasterizer(img.Bounds().Dx(), img.Bounds().Dy())
	ras.MoveTo(float32(x), float32(y))
	ras.LineTo(float32(x+w), float32(y))
	ras.LineTo(float32(x+w), float32(y+h))
	ras.LineTo(float32(x), float32(y+h))
	ras.ClosePath()

	ras.Draw(img, img.Bounds(), &image.Uniform{randColor(r)}, image.Point{})
}

func drawCircleAA(img *image.RGBA, r *rand.Rand) {
	maxR := min(img.Bounds().Dx(), img.Bounds().Dy()) / 3
	if maxR <= 5 {
		return
	}

	radius := float64(r.Intn(maxR-5) + 5)
	cx := float64(r.Intn(img.Bounds().Dx()))
	cy := float64(r.Intn(img.Bounds().Dy()))

	ras := vector.NewRasterizer(img.Bounds().Dx(), img.Bounds().Dy())
	steps := 64

	for i := 0; i <= steps; i++ {
		a := 2 * math.Pi * float64(i) / float64(steps)
		x := cx + math.Cos(a)*radius
		y := cy + math.Sin(a)*radius
		if i == 0 {
			ras.MoveTo(float32(x), float32(y))
		} else {
			ras.LineTo(float32(x), float32(y))
		}
	}
	ras.ClosePath()

	ras.Draw(img, img.Bounds(), &image.Uniform{randColor(r)}, image.Point{})
}

func drawTriangleAA(img *image.RGBA, r *rand.Rand) {
	p1 := randPoint(img, r)
	p2 := randPoint(img, r)
	p3 := randPoint(img, r)

	ras := vector.NewRasterizer(img.Bounds().Dx(), img.Bounds().Dy())
	ras.MoveTo(float32(p1.X), float32(p1.Y))
	ras.LineTo(float32(p2.X), float32(p2.Y))
	ras.LineTo(float32(p3.X), float32(p3.Y))
	ras.ClosePath()

	ras.Draw(img, img.Bounds(), &image.Uniform{randColor(r)}, image.Point{})
}

func randPoint(img *image.RGBA, r *rand.Rand) image.Point {
	return image.Pt(
		r.Intn(img.Bounds().Dx()),
		r.Intn(img.Bounds().Dy()),
	)
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
